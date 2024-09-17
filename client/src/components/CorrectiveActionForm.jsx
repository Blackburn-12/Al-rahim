import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCorrectiveAction } from "../redux/slices/formSlice"; // Import the action
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { toast } from "react-toastify";
import moment from "moment";

const CorrectiveActionForm = ({ navigate, prevStep }) => {
  const dispatch = useDispatch();
  const { correctiveAction } = useSelector((state) => state.form.formData);

  const [detection, setDetection] = useState(correctiveAction.detection || "");
  const [occurrence, setOccurrence] = useState(
    correctiveAction.occurrence || ""
  );
  const [dateOccurred, setDateOccurred] = useState(
    correctiveAction.dateOccurred
      ? moment(correctiveAction.dateOccurred).format("YYYY-MM-DD")
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
    dispatch(updateCorrectiveAction({ dateOccurred: formattedDate }));
  };
  
  
  useEffect(() => {
    dispatch(updateCorrectiveAction({ detection, occurrence }));
  }, [detection, occurrence, dispatch]);

  const handleNextClick = () => {
    if (detection && occurrence && dateOccurred) {
      console.log(detection);
      console.log(occurrence);
      console.log(dateOccurred);

      navigate(); // Replace "/next-page" with the actual route you want to navigate to
    } else {
      toast.error("Please fill in all required fields");
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
      <div className="absolute top-[55%] lg:top-[55%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0 overflow-y-auto">
        <h2 className="font-Poppins text-[36px] font-bold mb-4">
          Corrective Action
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
            onClick={handleNextClick}
            className="bg-[#005B70] text-white py-2 px-4 rounded-lg font-Poppins"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorrectiveActionForm;
