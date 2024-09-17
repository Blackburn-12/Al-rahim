import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePreventiveAction, submitForm } from "../redux/slices/formSlice"; // Import the action
import { resetForm } from "../redux/slices/formSlice";
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PreventiveActionForm = ({ navigate, prevStep }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const { preventiveAction } = formData;
  const reactkaNavigate = useNavigate();
  const [detection, setDetection] = useState(preventiveAction.detection || "");
  const [occurrence, setOccurrence] = useState(
    preventiveAction.occurrence || ""
  );
  const [dateOccurred, setDateOccurred] = useState(
    preventiveAction.dateOccurred
      ? moment(preventiveAction.dateOccurred).format("YYYY-MM-DD")
      : ""
  );

  const dateInputRef = useRef(null);

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    const formattedDate = moment(dateValue, "YYYY-MM-DD").format("YYYY-MM-DD");

    setDateOccurred(formattedDate);
    dispatch(updatePreventiveAction({ dateOccurred: formattedDate }));
  };

  useEffect(() => {
    dispatch(updatePreventiveAction({ detection, occurrence }));
  }, [detection, occurrence, dispatch]);

  const handleSubmit = async () => {
    if (detection && occurrence && dateOccurred) {
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
      toast.error("Please fill in all required fields");
    }
  };
  
  const submitButton = () => {
    handleSubmit();
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
      <div className="absolute top-[55%] lg:top-[55%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0 overflow-y-auto">
        <h2 className="font-Poppins text-[36px] font-bold mb-4">
          Preventive Action
        </h2>
        <div className="flex items-center justify-between mb-6">
          <div className="font-Poppins text-[20px]">CAPA Module</div>
        </div>
        <div className="mb-6">
          <textarea
            value={detection}
            onChange={(event) => {
              setDetection(event.target.value);
              adjustTextareaHeight(event);
            }}
            className="font-Poppins block w-full py-2 px-3 text-lg bg-transparent border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Detection"
            rows={1}
          />
          <textarea
            value={occurrence}
            onChange={(event) => {
              setOccurrence(event.target.value);
              adjustTextareaHeight(event);
            }}
            className="font-Poppins block w-full py-2 px-3 text-lg bg-transparent border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Occurrence"
            rows={1}
          />
          <div className="mt-6">
            <p className="font-Poppins text-gray-700">Problem Occurring date</p>
            <input
              type="date"
              value={dateOccurred}
              onChange={handleDateChange}
              className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600"
              ref={dateInputRef}
              placeholder="Problem Statement Date"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg font-Poppins"
          >
            Previous
          </button>
          <button
            onClick={submitButton}
            className="bg-[#005B70] text-white py-2 px-4 rounded-lg font-Poppins"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreventiveActionForm;
