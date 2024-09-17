import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  fetchPostById,
  resetPostState,
  deletePost,
} from "../redux/slices/postSlice";
import { Loader, Navbar, Footer } from "../components";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.user); // Assuming you have an auth slice for user data
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchPostById(id));

    return () => {
      dispatch(resetPostState());
    };
  }, [dispatch, id]);

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const handleFallBack = () => {
    navigate("/");
  };

  const handleEdit = () => {
    // Show the toast notification
    toast.info("Redirecting to edit post page...");

    // Navigate to the edit page after a brief delay
    setTimeout(() => {
      navigate(`/edit-post/${post._id}`);
    }, 500); // Adjust timeout as needed
  };

  const handleDelete = async () => {
    try {
      // Dispatch the delete action and wait for it to complete
      await dispatch(deletePost(post._id)).unwrap();

      // Show the toast after a brief delay
      setTimeout(() => {
        toast.success("Post has been deleted successfully!");

        // Navigate after the post is deleted
        navigate("/");
      }, 1000); // Adjust timeout as needed
    } catch (error) {
      console.error("Failed to delete the post: ", error);
      toast.error("Failed to delete the post.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 mt-20 bg-gray-100 border border-gray-300 rounded-md font-Poppins">
        <GoArrowLeft
          onClick={handleFallBack}
          size={40}
          className="mb-4 cursor-pointer transition-transform duration-200 hover:bg-gray-400 hover:text-white p-2 rounded-full hover:scale-110"
        />
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-600">Error: {error.message}</p>
        ) : post ? (
          <>
            <div className="mb-2">
              <span className="font-semibold">User Name:</span> {post.user.name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">User Email:</span>{" "}
              {post.user.email}
            </div>
            <div className="mb-2">
              <span className="font-semibold">User Employee Code:</span>{" "}
              {post.user.employeeCode}
            </div>
            <div className="mb-2">
              <span className="font-semibold">User Email:</span>{" "}
              {post.user.department}
            </div>
            <div className="mb-2">
              <span className="font-semibold">CAPA Number:</span>{" "}
              {post.capaNumber}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Created At:</span>{" "}
              {formatDate(post.createdAt)}
            </div>
            {userInfo && userInfo._id === post.user?._id && (
              <div className="mt-4 flex justify-between items-center">
                <span className="text-[#005B70] font-semibold">Actions:</span>
                <div className="flex gap-2">
                  <MdEditSquare
                    onClick={handleEdit}
                    className="text-[#005B70] text-3xl cursor-pointer"
                  />
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <MdDelete
                      onClick={handleDelete}
                      className="text-[#005B70] text-3xl cursor-pointer"
                    />
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p>No post details available.</p>
        )}
      </div>

      <div className="p-4 mt-20 font-Poppins">
        <h1 className="text-2xl font-bold mb-4">Post Details</h1>
        {loading && <Loader />}
        {error && <p className="text-red-600">Error: {error.message}</p>}
        {post && (
          <table className="min-w-full bg-white border border-gray-200">
            <tbody>
              {/* Event Selection */}
              <tr>
                <td className="border px-4 py-2 font-semibold">Root Cause</td>
                <td className="border px-4 py-2">
                  {post.eventSelection.rootCause}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Cause Category
                </td>
                <td className="border px-4 py-2">
                  {post.eventSelection.causeCategory}
                </td>
              </tr>

              {/* Product Details */}
              <tr>
                <td className="border px-4 py-2 font-semibold">Customer</td>
                <td className="border px-4 py-2">
                  {post.productDetails.customer}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Brand</td>
                <td className="border px-4 py-2">
                  {post.productDetails.brand}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Product Type</td>
                <td className="border px-4 py-2">
                  {post.productDetails.productType}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Towel Type</td>
                <td className="border px-4 py-2">
                  {post.productDetails.towelType}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Article</td>
                <td className="border px-4 py-2">
                  {post.productDetails.article}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Size</td>
                <td className="border px-4 py-2">{post.productDetails.size}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Color</td>
                <td className="border px-4 py-2">
                  {post.productDetails.color}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Design</td>
                <td className="border px-4 py-2">
                  {post.productDetails.design}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Product ID</td>
                <td className="border px-4 py-2">
                  {post.productDetails.productId}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">SOS</td>
                <td className="border px-4 py-2">{post.productDetails.sos}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Customer PO</td>
                <td className="border px-4 py-2">
                  {post.productDetails.customerPO}
                </td>
              </tr>

              {/* Problem Discussion */}
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Problem Statement
                </td>
                <td className="border px-4 py-2">
                  {post.problemDiscussion.problemStatement}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Date Occurred
                </td>
                <td className="border px-4 py-2">
                  {formatDate(post.problemDiscussion.dateOccurred)}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Containment Action
                </td>
                <td className="border px-4 py-2">
                  {post.problemDiscussion.containmentAction}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-semibold">Member RCA</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc pl-4">
                    {post.problemDiscussion.memberRCA.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* RCA for 6Ms */}
              {Object.entries(post.rcaFor6Ms).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2 font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </td>
                  <td className="border px-4 py-2">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </td>
                </tr>
              ))}

              {/* {post.correctiveAction && (
                <>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Corrective Action Detection
                    </td>
                    <td className="border px-4 py-2">
                      {post.correctiveAction.detection || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Corrective Action Occurrence
                    </td>
                    <td className="border px-4 py-2">
                      {post.correctiveAction.occurrence || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Corrective Action Date
                    </td>
                    <td className="border px-4 py-2">
                      {post.correctiveAction.dateOccurred
                        ? formatDate(post.correctiveAction.dateOccurred)
                        : "N/A"}
                    </td>
                  </tr>
                </>
              )}

              {post.preventiveAction && (
                <>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Preventive Action Detection
                    </td>
                    <td className="border px-4 py-2">
                      {post.preventiveAction.detection || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Preventive Action Occurrence
                    </td>
                    <td className="border px-4 py-2">
                      {post.preventiveAction.occurrence || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      Preventive Action Date
                    </td>
                    <td className="border px-4 py-2">
                      {post.preventiveAction.dateOccurred
                        ? formatDate(post.preventiveAction.dateOccurred)
                        : "N/A"}
                    </td>
                  </tr>
                </>
              )} */}

              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Corrective Action Detection
                </td>
                <td className="border px-4 py-2">
                  {post.correctiveAction?.detection || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Corrective Action Occurrence
                </td>
                <td className="border px-4 py-2">
                  {post.correctiveAction?.occurrence || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Corrective Action Date
                </td>
                <td className="border px-4 py-2">
                  {post.correctiveAction?.dateOccurred
                    ? formatDate(post.correctiveAction?.dateOccurred)
                    : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Preventive Action Detection
                </td>
                <td className="border px-4 py-2">
                  {post.preventiveAction?.detection || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Preventive Action Occurrence
                </td>
                <td className="border px-4 py-2">
                  {post.preventiveAction?.occurrence || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Preventive Action Date
                </td>
                <td className="border px-4 py-2">
                  {post.preventiveAction?.dateOccurred
                    ? formatDate(post.preventiveAction?.dateOccurred)
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
