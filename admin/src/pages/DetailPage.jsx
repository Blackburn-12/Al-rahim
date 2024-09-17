import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, deletePost } from "../redux/slices/postSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Navbar, Footer, Loader } from "../components";
import { FiEdit, FiTrash } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostById(id));
    console.log(post);
  }, [dispatch, id]);

  const handleDelete = () => {
    if (post) {
      dispatch(deletePost(post._id))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to delete post:", error);
        });
    }
  };

  const handleFallBack = () => {
    navigate("/");
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    // Check if the date is already a valid Date object
    if (date instanceof Date && !isNaN(date.getTime())) {
      return format(date, "MMMM d, yyyy");
    }

    // If it's a string, try parsing it
    const parsedDate = new Date(date);

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      return format(parsedDate, "MMMM d, yyyy");
    }

    // If all else fails, return the original string
    return date;
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-20 p-6 font-Poppins">
        <GoArrowLeft
          onClick={handleFallBack}
          size={40}
          className="mb-4 cursor-pointer transition-transform duration-200 hover:bg-gray-400 hover:text-white p-2 rounded-full hover:scale-110"
        />

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-boxtext font-Poppins">
            CAPA Number: {post.capaNumber}
          </h1>
          <div className="flex space-x-4">
            <button
              className="text-buttonBeforeHover hover:text-buttonAfterHover font-Poppins"
              onClick={() => navigate(`/edit-post/${id}`)}
            >
              <FiEdit size={20} />
            </button>
            <button
              className="text-buttonBeforeHover hover:text-buttonAfterHover font-Poppins"
              onClick={handleDelete}
            >
              <FiTrash size={20} />
            </button>
          </div>
        </div>
        <p className="text-gray-400 mt-2 font-Poppins">
          Author: {post.user.name}
        </p>
        <p className="text-gray-400 mt-2 font-Poppins">
          Employee Code: {post.user.employeeCode}
        </p>
        <p className="text-gray-400 mt-2 font-Poppins">
          Depart: {post.user.department}
        </p>
        <p className="text-gray-400 mt-2 font-Poppins">
          Created At: {formatDate(post.createdAt)}
        </p>
        {post.updatedAt && (
          <p className="text-gray-400 mt-2 font-Poppins">
            Last Updated At: {formatDate(post.updatedAt)}
          </p>
        )}
        {post.updatedBy && post.updatedBy.email && (
          <p className="text-gray-400 mt-2 font-Poppins">
            Last Edited By: {post.updatedBy.email} ({post.updatedBy.role})
          </p>
        )}
        <div className="bg-[#005b70] p-2 rounded-md w-fit text-white font-semibold my-4">
          <Link to={`/fishbone/${id}`}>
            <p>Fishbone</p>
          </Link>
        </div>
        <table className="min-w-full bg-white mt-6 font-Poppins border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-2 text-left">Field</th>
              <th className="py-2 px-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Root Cause
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.eventSelection.rootCause}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Cause Category
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.eventSelection.causeCategory}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Customer
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.customer}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Brand
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.brand}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Product Type
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.productType}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Towel Type
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.towelType}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Article
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.article}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Size
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.size}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Color
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.color}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Design
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.design}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Product ID
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.productId}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                SOS
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.sos}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Customer PO
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.productDetails.customerPO}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Date Occurred
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {formatDate(post.problemDiscussion.dateOccurred)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Problem Statement
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.problemDiscussion.problemStatement}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Containment Action
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.problemDiscussion.containmentAction}
              </td>
            </tr>
            {/* <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Member RCA
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.problemDiscussion.memberRCA}
              </td>
            </tr> */}

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

            {Object.entries(post.rcaFor6Ms).map(([category, items], index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="py-2 px-2 font-semibold border-b border-gray-300">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-300">
                    <ul>
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="font-Poppins px-2 ">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            ))}
            {/* Corrective Action Rows */}
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Corrective Action Detection
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.correctiveAction?.detection || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Corrective Action Occurrence
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.correctiveAction?.dateOccurred
                  ? formatDate(post.correctiveAction?.dateOccurred)
                  : "N/A"}
              </td>
            </tr>

            {/* Preventive Action Rows */}
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Preventive Action Detection
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.preventiveAction?.detection || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-2 font-semibold border-b border-gray-300">
                Preventive Action Occurrence
              </td>
              <td className="py-2 px-2 border-b border-gray-300">
                {post.preventiveAction?.dateOccurred
                  ? formatDate(post.preventiveAction?.dateOccurred)
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
