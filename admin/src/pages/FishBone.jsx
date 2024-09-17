import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../redux/slices/postSlice';
import { GoArrowLeft } from "react-icons/go";

const FishBone = () => {
  const { id: postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId]);

  const handleFallBack = () => {
    navigate(`/posts/${post._id}`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  const rcaCategories = ["method", "material", "machine", "manpower", "measurement", "milieu"];

  return (
    <div className="container mx-auto px-4 py-12 font-Poppins">
      <GoArrowLeft
        onClick={handleFallBack}
        size={40}
        className="mb-4 cursor-pointer transition-transform duration-200 hover:bg-gray-400 hover:text-white p-2 rounded-full hover:scale-110"
      />
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Fishbone Diagram</h2>
      {post && post.rcaFor6Ms ? (
        <div className="relative w-full h-[600px] shadow-lg p-8 overflow-hidden">
          
          {/* Fish spine */}
          <div className="absolute w-[calc(100%-8rem)] h-1 bg-blue-600 top-1/2 left-16 transform -translate-y-1/2"></div>
          
          {/* Fish head */}
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[50px] border-b-[50px] border-l-[100px] border-t-transparent border-b-transparent border-l-blue-600"></div>
          
          {/* Fish eye */}
          <div className="absolute right-24 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-600"></div>
          
          {/* Categories */}
          {rcaCategories.map((category, index) => (
            <div
              key={index}
              className={`absolute ${index % 2 === 0 ? 'top-[15%]' : 'bottom-[15%]'} ${getLeftPosition(index)} w-1/4`}
            >
              <div
                className={`w-full h-0.5 bg-blue-400 transform ${index % 2 === 0 ? '-rotate-30' : 'rotate-30'}`}
              ></div>
              <div className={`mt-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold capitalize text-lg text-blue-700 mb-2">{category}</h3>
                <ul className="list-none text-sm space-y-1">
                  {post.rcaFor6Ms[category].map((cause, idx) => (
                    <li key={idx} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Problem statement */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md z-10">
            <h3 className="text-lg font-bold text-blue-800">Problem Statement</h3>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600">No RCA data available.</div>
      )}
    </div>
  );
};

function getLeftPosition(index) {
  const positions = ['left-8', 'left-1/3', 'left-2/3'];
  return positions[index % 3];
}

export default FishBone;
