import React from "react";
import { useDispatch, useSelector } from "react-redux";
import towelImg from "../assets/background.jpg";
import { updateEventSelection } from "../redux/slices/formSlice";
import { toast } from "react-toastify"; // Import Toastify
import logo from "../assets/logomain.png";

const eventOptions = {
  "INSPECTION FAILURE": [
    "Color Variation",
    "Stitching Defects",
    "Sizing Issues",
    "Fabric Quality",
    "Thread Pulls",
    "Fiber Shedding",
    "Pattern Misalignment",
    "Labeling Errors",
    "Towel Weight",
    "Uneven Dyeing",
    "Piling",
    "Hem Defects",
    "Fading",
    "Poor Absorbency",
    "Odor Retention",
  ],
  "TESTING FAILURE": [
    "PERFORMANCE FAILURE",
    "DURABILITY FAILURE",
    "AESTHETICS FAILURE",
    "MRSL NON COMPLIANT",
    "OTHERS",
  ],
  "MACHINE FAILURE": [
    "BREAKDOWN",
    "WRONG PARAMETER",
    "PPE'S MISSING",
    "DAMAGE/RUSTED/DETERIORATED",
    "MISSING MAINTENANCE HISTORY",
    "OTHERS",
  ],
  PURCHASE: [
    "UNAPPROVED SUPPLIER",
    "LATE DELIVERY",
    "WRONG DELIVERY",
    "DAMAGES IN DELIVERY",
    "CONTAMINATED PRODUCT DELIVERED",
    "OTHERS",
  ],
  "MANUFACTURING PROCESS": [
    "PRODUCT HANDLING",
    "SITE CONDITIONS",
    "MISSING LITERATURE",
    "STORAGE CONDITIONS",
    "BIOLOGICAL CONTAMINATION",
    "METAL POLICY VIOLATION",
    "MFZ VIOLATION",
    "NCP VIOLATION",
    "CALIBRATION ISSUES",
    "OTHERS",
  ],
  "HS&E": [
    "CHEMICAL HANDLING FAILURE",
    "NO PPE'S",
    "INADEQUATE PPE'S",
    "MISSING/FAULTY SAFETY MEASURES",
    "MISSING/FAULTY FIRE SAFETY",
    "NO/FADED/MISSING/WRONG PATHWAYS",
    "SAFETY GUIDELINES/MAPS MISSING",
    "OTHERS",
  ],
  OTHERS: ["LIGHTNING ISSUES", "TRAINING ISSUES", "OTHERS"],
};

const EventSelectionForm = ({ navigate }) => {
  const dispatch = useDispatch();
  const { rootCause, causeCategory, otherDetail, isOpenEvent, isOpenDetail } =
    useSelector((state) => state.form.formData.eventSelection);

  const handleEventClick = (option) => {
    dispatch(
      updateEventSelection({
        rootCause: option,
        causeCategory: "Select Details",
        otherDetail: "",
        isOpenEvent: false,
      })
    );
  };

  const handleDetailClick = (option) => {
    dispatch(
      updateEventSelection({
        causeCategory: option,
        otherDetail: "",
        isOpenDetail: false,
      })
    );
  };

  const handleOtherDetailChange = (event) => {
    dispatch(
      updateEventSelection({
        otherDetail: event.target.value,
      })
    );
  };

  const toggleDropdownEvent = () => {
    dispatch(
      updateEventSelection({
        isOpenEvent: !isOpenEvent,
        isOpenDetail: false,
      })
    );
  };

  const toggleDropdownDetail = () => {
    dispatch(
      updateEventSelection({
        isOpenDetail: !isOpenDetail,
        isOpenEvent: false,
      })
    );
  };

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleNextClick = () => {
    if (rootCause && causeCategory && causeCategory !== "Select Details") {
      console.log({
        eventSelection: {
          rootCause,
          causeCategory,
          otherDetail,
        },
      });
      navigate(); // Calls the navigate function passed from parent
    } else {
      toast.error("Please select both event and detail."); // Show error toast
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
          Event Selection
        </h2>
        <div className="flex items-center justify-between">
          <div className="font-Poppins text-[20px]">CAPA Module</div>
        </div>

        <div>
          {/* Dependent Dropdown 1*/}
          <div className="mb-4 mt-4 relative inline-block text-left w-full">
            <button
              onClick={toggleDropdownEvent}
              className="w-full font-Poppins rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-100 text-lg font-medium text-black text-left hover:bg-gray-200 focus:outline-none"
              id="menu-button"
              aria-expanded={isOpenEvent}
              aria-haspopup="true"
            >
              {rootCause || "Select Event Failure"}
            </button>
            {isOpenEvent && (
              <div
                className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {Object.keys(eventOptions).map((option) => (
                    <div
                      key={option}
                      className="font-Poppins text-black block px-4 py-2 text-lg hover:bg-[#005B70] hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex="-1"
                      id={`menu-item-${option}`}
                      onClick={() => handleEventClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dependent Dropdown 2*/}
          <div className="mb-0 relative inline-block text-left w-full">
            <button
              onClick={toggleDropdownDetail}
              className={`font-Poppins w-full rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-100 text-lg font-medium text-black text-left ${
                rootCause === "Select Event Failure"
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-gray-300"
              } focus:outline-none`}
              id="menu-button"
              aria-expanded={isOpenDetail}
              aria-haspopup="true"
              disabled={rootCause === "Select Event Failure"}
            >
              {causeCategory || "Select Details"}
            </button>
            {isOpenDetail && rootCause !== "Select Event Failure" && (
              <div
                className="font-Poppins origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {eventOptions[rootCause]?.map((option) => (
                    <div
                      key={option}
                      className="text-black block px-4 py-2 text-lg hover:bg-[#005B70] hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex="-1"
                      id={`menu-item-${option}`}
                      onClick={() => handleDetailClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative mb-4">
            {causeCategory === "OTHERS" && (
              <textarea
                value={otherDetail}
                onChange={(event) => {
                  handleOtherDetailChange(event);
                  adjustTextareaHeight(event);
                }}
                className="font-Poppins mt-4 px-2 block w-full py-2 pr-10 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 overflow-y-auto custom-scrollbar"
                placeholder="Why"
                rows={1}
              />
            )}
          </div>
        </div>
        <button
          className="mt-4 font-Poppins bg-primary-button text-white px-4 py-2 rounded hover:bg-primary-button-hover min-w-fit flex justify-center items-center mx-auto"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventSelectionForm;
