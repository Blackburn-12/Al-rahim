import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import { fetchTotalPostsCount } from "../redux/slices/postCountSlice";
import { Link } from "react-router-dom";
import { Navbar, Footer, Loader } from "../components";
import moment from "moment";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [newPostNotification, setNewPostNotification] = useState(null);
  const [filter, setFilter] = useState("all");

  const { posts, loading, error } = useSelector((state) => state.posts);
  const {
    totalPosts,
    loading: countLoading,
    error: countError,
  } = useSelector((state) => state.postsCounter);

  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTotalPostsCount());

    const socket = io("http://localhost:5000");

    socket.on("newPost", (newPost) => {
      setNewPostNotification(newPost);
      dispatch(fetchPosts());
      dispatch(fetchTotalPostsCount());
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  if (loading || countLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error || countError) {
    return <div>Error: {error || countError}</div>;
  }

  const filteredPosts = posts.filter((post) => {
    if (filter === "approved") return post.isApproved;
    if (filter === "unapproved") return !post.isApproved;
    return true; // for "all"
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 max-w-4xl mx-auto mt-16">
        <div className="bg-[#E5E5E1] p-4 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-Poppins font-bold text-gray-700">
            Total CAPA Modules Created
          </h2>
          <p className="text-3xl font-Poppins font-extrabold text-gray-800 mt-2">
            {totalPosts}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 justify-center mb-4">
          <button
            className={`px-4 py-2 font-Poppins rounded-lg ${
              filter === "all" ? "bg-primary-button text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setFilter("all")}
          >
            Show All
          </button>
          <button
            className={`px-4 py-2 font-Poppins rounded-lg ${
              filter === "approved" ? "bg-primary-button text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setFilter("approved")}
          >
            Approved
          </button>
          <button
            className={`px-4 py-2 font-Poppins rounded-lg ${
              filter === "unapproved" ? "bg-primary-button text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setFilter("unapproved")}
          >
            Unapproved
          </button>
        </div>

        {/* Notification Banner */}
        {newPostNotification && (
          <div className="bg-primary-button text-white p-4 rounded-lg shadow-md">
            <p className="font-Poppins font-bold">
              New CAPA Module Created: CAPA #{newPostNotification.capaNumber}
            </p>
            <p className="font-Poppins">
              Root Cause: {newPostNotification.eventSelection.rootCause}
            </p>
            <p className="font-Poppins">
              Problem Statement: {newPostNotification.problemDiscussion.problemStatement}
            </p>
            <Link
              to={`/posts/${newPostNotification._id}`}
              className="text-white underline mt-2 block"
            >
              View Post
            </Link>
          </div>
        )}

        {/* Display Posts */}
        {filteredPosts.map((post) => (
          user ? (
            <Link
              key={post._id}
              to={`/posts/${post._id}`}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-Poppins font-bold text-boxtext">
                  CAPA #{post.capaNumber}
                </h2>
                <p className="text-gray-400 font-Poppins">
                  Created At:{" "}
                  {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-boxtext font-Poppins">Root Cause</h3>
                <p className="text-gray-700 font-Poppins">{post.eventSelection.rootCause}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-boxtext font-Poppins">
                  Problem Statement
                </h3>
                <p className="text-gray-700 font-Poppins">
                  {post.problemDiscussion.problemStatement}
                </p>
              </div>
              {post.user && (
                <p className="text-gray-400 mt-4 font-Poppins">
                  Author: {post.user.name}
                </p>
              )}
            </Link>
          ) : (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-Poppins font-bold text-boxtext">
                  CAPA #{post.capaNumber}
                </h2>
                <p className="text-gray-400 font-Poppins">
                  Created At:{" "}
                  {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-boxtext font-Poppins">Root Cause</h3>
                <p className="text-gray-700 font-Poppins">{post.eventSelection.rootCause}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-boxtext font-Poppins">
                  Problem Statement
                </h3>
                <p className="text-gray-700 font-Poppins">
                  {post.problemDiscussion.problemStatement}
                </p>
              </div>
              {post.user && (
                <p className="text-gray-400 mt-4 font-Poppins">
                  Author: {post.user.name}
                </p>
              )}
              <p className="text-red-500 mt-4 font-Poppins">Please log in first to view details.</p>
            </div>
          )
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
