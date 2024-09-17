import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyPosts,
  fetchApprovedPosts,
  fetchUnapprovedPosts,
} from "../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Loader, Navbar, Footer } from "../components/index";
const MyPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage which posts are displayed
  const [view, setView] = useState("myPosts"); // Can be "myPosts", "approvedPosts", or "unapprovedPosts"

  const {
    myPosts,
    myPostsLoading,
    myPostsError,
    approvedPosts,
    approvedPostsLoading,
    approvedPostsError,
    unapprovedPosts,
    unapprovedPostsLoading,
    unapprovedPostsError,
  } = useSelector((state) => state.posts);

  // Fetch posts based on the current view
  useEffect(() => {
    if (view === "myPosts") {
      dispatch(fetchMyPosts());
    } else if (view === "approvedPosts") {
      dispatch(fetchApprovedPosts());
    } else if (view === "unapprovedPosts") {
      dispatch(fetchUnapprovedPosts());
    }
  }, [dispatch, view]);

  const getPosts = () => {
    switch (view) {
      case "approvedPosts":
        return {
          posts: approvedPosts,
          loading: approvedPostsLoading,
          error: approvedPostsError,
        };
      case "unapprovedPosts":
        return {
          posts: unapprovedPosts,
          loading: unapprovedPostsLoading,
          error: unapprovedPostsError,
        };
      default:
        return { posts: myPosts, loading: myPostsLoading, error: myPostsError };
    }
  };

  const { posts, loading, error } = getPosts();

  if (loading) return <div className="text-center py-10"><Loader/></div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 font-Poppins">
      <Navbar/>
      <h2 className="text-2xl font-semibold mb-8">Posts</h2>
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setView("myPosts")}
          className={`px-4 py-2 rounded-md ${
            view === "myPosts"
              ? "bg-[#005B70] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setView("approvedPosts")}
          className={`px-4 py-2 rounded-md ${
            view === "approvedPosts"
              ? "bg-[#005B70] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Approved Posts
        </button>
        <button
          onClick={() => setView("unapprovedPosts")}
          className={`px-4 py-2 rounded-md ${
            view === "unapprovedPosts"
              ? "bg-[#005B70] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Unapproved Posts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                CAPA Number: {post.capaNumber}
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Problem Statement:</strong>{" "}
                {post.problemDiscussion?.problemStatement}
              </p>
              <div className="text-gray-700 mb-2">
                <strong>Created By:</strong> {post.user?.name}
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Creation Date:</strong>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
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
            No posts found matching your criteria.
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MyPosts;
