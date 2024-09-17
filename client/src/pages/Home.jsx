import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../redux/slices/postSlice'; // Adjust the path based on your project structure
import { Loader, Navbar, Footer } from '../components/index';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = Array.isArray(posts) ? posts.filter((post) =>
    post.capaNumber.toString().includes(searchQuery) || 
    post.problemDiscussion.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between font-Poppins">
        <div className="container mx-auto px-4">
          <div className="flex justify-center my-4 ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by CAPA Number, Problem Statement, or Created By"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full mt-16"
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-red-600 text-center my-4">
              Error fetching posts: {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">CAPA Number: {post.capaNumber}</h2>
                    
                    <p className="text-gray-700 mb-4">
                      <strong>Problem Statement:</strong> {post.problemDiscussion.problemStatement}
                    </p>
                    
                    <div className="text-gray-700 mb-2">
                      <strong>Created By:</strong> {post.user.name}
                    </div>
                    
                    <div className="text-gray-700 mb-2">
                      <strong>Creation Date:</strong> {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                    <Link 
                      to={`/posts/${post._id}`} 
                      className="text-white bg-[#005B70] px-3 py-3 rounded-md hover:bg-[#014a5a] mt-4 inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 col-span-full">
                  No posts found matching your search criteria.
                </div>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
