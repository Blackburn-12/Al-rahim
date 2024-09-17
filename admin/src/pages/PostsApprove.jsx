import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnapprovedPosts, approvePost } from '../redux/slices/postSlice'; // Adjust the import path as needed
import { Navbar,Loader,Footer } from '../components';
const PostsApprove = () => {
  const dispatch = useDispatch();
  const { unapprovedPosts, loading, error } = useSelector((state) => state.posts);
  const [approvedPostIds, setApprovedPostIds] = useState([]);

  useEffect(() => {
    dispatch(fetchUnapprovedPosts());
  }, [dispatch]);

  const handleApprove = async (postId) => {
    try {
      await dispatch(approvePost(postId)).unwrap();
      setApprovedPostIds((prev) => [...prev, postId]);
    } catch (err) {
      console.error('Failed to approve post:', err);
    }
  };

  if (loading) return <div className="text-center text-xl"><Loader/></div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 font-Poppins">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center mt-20">Approve Posts</h1>
      {unapprovedPosts.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">CAPA Number</th>
              <th className="py-3 px-6 text-left">Root Cause</th>
              <th className="py-3 px-6 text-left">Problem Statement</th>
              <th className="py-3 px-6 text-left">Created By</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {unapprovedPosts.map((post) => (
              <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{post.capaNumber}</td>
                <td className="py-3 px-6 text-left">{post.eventSelection.rootCause}</td>
                <td className="py-3 px-6 text-left">{post.problemDiscussion.problemStatement}</td>
                
                <td className="py-3 px-6 text-left">{post.user?.name || 'Unknown'}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleApprove(post._id)}
                    disabled={approvedPostIds.includes(post._id)}
                    className={`py-2 px-4 rounded-md transition-colors ${
                      approvedPostIds.includes(post._id)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {approvedPostIds.includes(post._id) ? 'Approved' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-xl mt-8">No posts waiting for approval.</p>
      )}
      <Footer/>
    </div>
  );
};

export default PostsApprove;
