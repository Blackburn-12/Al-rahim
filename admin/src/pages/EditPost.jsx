import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../redux/slices/postSlice";
import { Loader, Navbar, Footer } from "../components";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useSelector((state) => state.posts);

  const handleCancel = () => {
    navigate(`/posts/${id}`);
  };
  const [formData, setFormData] = useState({
    rootCause: "",
    causeCategory: "",
    customer: "",
    brand: "",
    productType: "",
    towelType: "",
    article: "",
    size: "",
    color: "",
    design: "",
    productId: "",
    sos: "",
    customerPO: "",
    problemStatement: "",
    containmentAction: "",
    memberRCA: "",
    method: "",
    material: "",
    machine: "",
    manpower: "",
    measurement: "",
    milieu: "",
    detection: "",
    occurrence: "",
    capaNumber: "",
  });

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setFormData({
        rootCause: post.eventSelection?.rootCause || "",
        causeCategory: post.eventSelection?.causeCategory || "",
        customer: post.productDetails?.customer || "",
        brand: post.productDetails?.brand || "",
        productType: post.productDetails?.productType || "",
        towelType: post.productDetails?.towelType || "",
        article: post.productDetails?.article || "",
        size: post.productDetails?.size || "",
        color: post.productDetails?.color || "",
        design: post.productDetails?.design || "",
        productId: post.productDetails?.productId || "",
        sos: post.productDetails?.sos || "",
        customerPO: post.productDetails?.customerPO || "",
        problemStatement: post.problemDiscussion?.problemStatement || "",
        containmentAction: post.problemDiscussion?.containmentAction || "",
        memberRCA: post.problemDiscussion?.memberRCA || "",
        method: post.rcaFor6Ms?.method?.join(", ") || "",
        material: post.rcaFor6Ms?.material?.join(", ") || "",
        machine: post.rcaFor6Ms?.machine?.join(", ") || "",
        manpower: post.rcaFor6Ms?.manpower?.join(", ") || "",
        measurement: post.rcaFor6Ms?.measurement?.join(", ") || "",
        milieu: post.rcaFor6Ms?.milieu?.join(", ") || "",
        detection: post.correctiveAction?.detection || "",
        occurrence: post.correctiveAction?.occurrence || "",
        capaNumber: post.capaNumber || "",
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle array fields
    const isArrayField = [
      "method",
      "material",
      "machine",
      "manpower",
      "measurement",
      "milieu",
    ].includes(name);
    const processedValue = isArrayField
      ? value.split(",").map((item) => item.trim())
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventSelection: {
        rootCause: formData.rootCause,
        causeCategory: formData.causeCategory,
      },
      productDetails: {
        customer: formData.customer,
        brand: formData.brand,
        productType: formData.productType,
        towelType: formData.towelType,
        article: formData.article,
        size: formData.size,
        color: formData.color,
        design: formData.design,
        productId: formData.productId,
        sos: formData.sos,
        customerPO: formData.customerPO,
      },
      problemDiscussion: {
        problemStatement: formData.problemStatement,
        containmentAction: formData.containmentAction,
        memberRCA: formData.memberRCA,
      },
      rcaFor6Ms: {
        method: formData.method,
        material: formData.material,
        machine: formData.machine,
        manpower: formData.manpower,
        measurement: formData.measurement,
        milieu: formData.milieu,
      },
      correctiveAction: {
        detection: formData.detection,
        occurrence: formData.occurrence,
      },
      capaNumber: formData.capaNumber,
      _id: id,
    };

    try {
      console.log("Payload before submission:", payload); // Log the payload to check structure

      // Dispatch the updatePost action and wait for it to complete
      await dispatch(updatePost(payload)).unwrap();

      // Show a success toast notification

      // Dispatch fetchPostById and wait for it to complete
      await dispatch(fetchPostById(id)).unwrap();
      // Show a success toast notification
      toast.success("Post updated successfully!");

      // Navigate to the updated post page
      navigate(`/posts/${id}`);
    } catch (error) {
      // Show an error toast notification
      toast.error("Failed to update post. Please try again.");
      console.error("Failed to update post:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 font-Poppins">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Root Cause", name: "rootCause" },
            { label: "Cause Category", name: "causeCategory" },
            { label: "Customer", name: "customer" },
            { label: "Brand", name: "brand" },
            { label: "Product Type", name: "productType" },
            { label: "Towel Type", name: "towelType" },
            { label: "Article", name: "article" },
            { label: "Size", name: "size" },
            { label: "Color", name: "color" },
            { label: "Design", name: "design" },
            { label: "Product ID", name: "productId" },
            { label: "SOS", name: "sos" },
            { label: "Customer PO", name: "customerPO" },
            {
              label: "Problem Statement",
              name: "problemStatement",
              type: "textarea",
            },
            {
              label: "Containment Action",
              name: "containmentAction",
              type: "textarea",
            },
            { label: "Member RCA", name: "memberRCA" },
            { label: "Method", name: "method" },
            { label: "Material", name: "material" },
            { label: "Machine", name: "machine" },
            { label: "Manpower", name: "manpower" },
            { label: "Measurement", name: "measurement" },
            { label: "Milieu", name: "milieu" },
            { label: "Detection", name: "detection" },
            { label: "Occurrence", name: "occurrence" },
            { label: "CAPA Number", name: "capaNumber" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-gray-700"
                htmlFor={name}
              >
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-textarea mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="form-input mt-1 px-2 py-2 block w-full border border-gray-300 rounded-md shadow-md text-black"
                />
              )}
            </div>
          ))}
          <div className="flex gap-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-blue-600 transition duration-200"
            >
              Update Post
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-3 rounded-md font-medium shadow
            transition duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
