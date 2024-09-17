import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { submitForm, resetForm, updateRcaFor6Ms, addRcaField, removeRcaField } from "../redux/slices/formSlice";
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { FaSquarePlus } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RcaFor6MsForm = ({ prevStep, navigate }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const rcaFor6Ms = useSelector((state) => state.form.formData.rcaFor6Ms);
  const approvalStatus = useSelector((state) => state.form.formData.approvalStatus);
  const reactkaNavigate = useNavigate();

  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  // Categories to be used in the form
  const categories = ["manpower", "machine", "material", "method", "measurement", "milieu"];

  // Initialize formData if it's not already initialized
  useEffect(() => {
    if (!categories.every((cat) => Array.isArray(rcaFor6Ms[cat]))) {
      const initializedData = {};
      categories.forEach((category) => {
        initializedData[category] = Array.isArray(rcaFor6Ms[category]) ? rcaFor6Ms[category] : [{ value: "" }];
      });
      dispatch(updateRcaFor6Ms(initializedData));
    }
  }, [dispatch, rcaFor6Ms, categories]);

  // Update form data in Redux store
  const handleChange = (category, index, value) => {
    const updatedCategory = [...rcaFor6Ms[category]];
    updatedCategory[index] = { value };
    dispatch(updateRcaFor6Ms({ [category]: updatedCategory }));
  };

  // Add a new field to a category
  const handleAddField = (category) => {
    dispatch(addRcaField({ category }));
  };

  // Remove a field from a category
  const handleRemoveField = (category, index) => {
    dispatch(removeRcaField({ category, index }));
  };

  // Adjust the height of the textarea based on content
  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Render form fields for a specific category
  const renderFields = (category) => (
    <div key={category} className="mb-4">
      <h3 className="text-xl font-semibold mb-2 capitalize">{category}</h3>
      {(rcaFor6Ms[category] || []).map((field, index) => (
        <div key={index} className="flex items-center mb-2">
          <textarea
            value={field.value}
            onChange={(e) => {
              handleChange(category, index, e.target.value);
              adjustTextareaHeight(e);
            }}
            rows="1"
            className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder={`${category} ${index + 1}`}
          />
          {index > 0 && (
            <button
              onClick={() => handleRemoveField(category, index)}
              className="ml-2 px-2 py-1 text-2xl text-red-500 rounded"
            >
              <IoMdRemoveCircle />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => handleAddField(category)}
        className="mt-2 px-2 py-1 text-2xl text-[#005B70] rounded"
      >
        <FaSquarePlus />
      </button>
    </div>
  );

  // Handle form submission
  const handleSubmit = async () => {
    const isRcaFilled = categories.every((category) =>
      (rcaFor6Ms[category] || []).every((field) => field.value.trim() !== "")
    );
    if (isRcaFilled) {
      try {
        const resultAction = await dispatch(submitForm(formData)).unwrap();
        toast.success("Form submitted successfully!");

        // Reset form values
        dispatch(resetForm());

        // Navigate to the PostDetail page using the ID from the result
        reactkaNavigate(`/posts/${resultAction._id}`);
      } catch (err) {
        toast.error(`Failed to submit form: ${err.message}`);
      }
    } else {
      toast.error("Please fill in all RCA fields before submitting the form.");
    }
  };

  useEffect(() => {
    // Update Next button state based on approval status
    setIsNextButtonActive(approvalStatus === "approved");
  }, [approvalStatus]);

  const handleNextClick = () => {
    if (isNextButtonActive) {
      navigate();
    } else {
      toast.error("Post not approved. Next step is disabled.");
    }
  };

  return (
    <div className="relative h-[94vh] w-screen">
      <img
        src={towelImg}
        alt="Background"
        className="object-cover h-full w-full"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
      <div className="hidden lg:block absolute top-[50%] left-[25%] transform -translate-x-[50%] -translate-y-[50%] text-center">
        <img src={logo} alt="LargeLogomain" />
      </div>
      <div className="absolute top-[55%] lg:top-[55%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <h2 className="font-Poppins text-[36px] font-bold mb-4">
          Root Cause Analysis
        </h2>

        {categories.map((category) => renderFields(category))}

        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg font-Poppins"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#005B70] text-white py-2 px-4 rounded-lg font-Poppins"
          >
            Submit
          </button>
          <button
            onClick={handleNextClick}
            className={`${
              isNextButtonActive ? "bg-[#005B70]" : "bg-gray-400 cursor-not-allowed"
            } text-white py-2 px-4 rounded-lg font-Poppins`}
            disabled={!isNextButtonActive}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RcaFor6MsForm;