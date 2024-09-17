import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { fetchPostById, updatePost } from "../redux/slices/postSlice";
import { Loader, Navbar, Footer } from "../components";
import { GoArrowLeft } from "react-icons/go";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useSelector((state) => state.posts);

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
    dateOccurred: "",
    problemStatement: "",
    containmentAction: "",
    memberRCA: "",
    method: [""],
    material: [""],
    machine: [""],
    manpower: [""],
    measurement: [""],
    milieu: [""],
    correctiveActionDetection: "",
    correctiveActionOccurrence: "",
    correctiveActionDate: "",
    preventiveActionDetection: "",
    preventiveActionOccurrence: "",
    preventiveActionDate: "",
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
        dateOccurred: post.problemDiscussion?.dateOccurred
          ? moment(post.problemDiscussion.dateOccurred).format("YYYY-MM-DD")
          : "",
        problemStatement: post.problemDiscussion?.problemStatement || "",
        containmentAction: post.problemDiscussion?.containmentAction || "",
        memberRCA: post.problemDiscussion?.memberRCA || "",
        method: post.rcaFor6Ms?.method || [""],
        material: post.rcaFor6Ms?.material || [""],
        machine: post.rcaFor6Ms?.machine || [""],
        manpower: post.rcaFor6Ms?.manpower || [""],
        measurement: post.rcaFor6Ms?.measurement || [""],
        milieu: post.rcaFor6Ms?.milieu || [""],
        correctiveActionDetection: post.correctiveAction?.detection || "",
        correctiveActionOccurrence: post.correctiveAction?.occurrence || "",
        correctiveActionDate: post.correctiveAction?.dateOccurred
          ? moment(post.correctiveAction.dateOccurred).format("YYYY-MM-DD")
          : "",
        preventiveActionDetection: post.preventiveAction?.detection || "",
        preventiveActionOccurrence: post.preventiveAction?.occurrence || "",
        preventiveActionDate: post.preventiveAction?.dateOccurred
          ? moment(post.preventiveAction.dateOccurred).format("YYYY-MM-DD")
          : "",
        capaNumber: post.capaNumber || "",
        isApproved: post.isApproved || false,
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatArrayField = (field) =>
      Array.isArray(field)
        ? field
        : field.split(",").map((item) => item.trim());

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
        dateOccurred: formData.dateOccurred,
      },
      rcaFor6Ms: {
        method: formatArrayField(formData.method),
        material: formatArrayField(formData.material),
        machine: formatArrayField(formData.machine),
        manpower: formatArrayField(formData.manpower),
        measurement: formatArrayField(formData.measurement),
        milieu: formatArrayField(formData.milieu),
      },
      correctiveAction: {
        detection: formData.correctiveActionDetection,
        occurrence: formData.correctiveActionOccurrence,
        dateOccurred: formData.correctiveActionDate,
      },
      preventiveAction: {
        detection: formData.preventiveActionDetection,
        occurrence: formData.preventiveActionOccurrence,
        dateOccurred: formData.preventiveActionDate,
      },
      capaNumber: formData.capaNumber,
      _id: id,
    };

    dispatch(updatePost(payload))
      .unwrap()
      .then(() => {
        dispatch(fetchPostById(id));
        navigate(`/posts/${id}`);
      })
      .catch((error) => {
        console.error("Failed to update post:", error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  const handleFallBack = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-20 mx-auto px-4 py-8 font-Poppins">
        <GoArrowLeft
          onClick={handleFallBack}
          size={40}
          className="mb-4 cursor-pointer transition-transform duration-200 hover:bg-gray-300 hover:text-black p-2 rounded-full hover:scale-110"
        />
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
            { label: "Date Occurred", name: "dateOccurred", type: "date" },
            { label: "Problem Statement", name: "problemStatement", type: "textarea" },
            { label: "Containment Action", name: "containmentAction", type: "textarea" },
            { label: "Member RCA", name: "memberRCA" },
            { label: "Method", name: "method" },
            { label: "Material", name: "material" },
            { label: "Machine", name: "machine" },
            { label: "Manpower", name: "manpower" },
            { label: "Measurement", name: "measurement" },
            { label: "Milieu", name: "milieu" },
            {
              label: "Corrective Action Detection",
              name: "correctiveActionDetection",
              disabled: !formData.isApproved,
            },
            {
              label: "Corrective Action Occurrence",
              name: "correctiveActionOccurrence",
              disabled: !formData.isApproved,
            },
            {
              label: "Corrective Action Date",
              name: "correctiveActionDate",
              type: "date",
              disabled: !formData.isApproved,
            },
            {
              label: "Preventive Action Detection",
              name: "preventiveActionDetection",
              disabled: !formData.isApproved,
            },
            {
              label: "Preventive Action Occurrence",
              name: "preventiveActionOccurrence",
              disabled: !formData.isApproved,
            },
            {
              label: "Preventive Action Date",
              name: "preventiveActionDate",
              type: "date",
              disabled: !formData.isApproved,
            },
            { label: "CAPA Number", name: "capaNumber" },
          ].map(({ label, name, type = "text", disabled = false }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  rows="4"
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="form-textarea mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm"
                  disabled={disabled}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={type === "date" ? handleDateChange : handleInputChange}
                  className="form-input mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm"
                  disabled={disabled}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Post
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
