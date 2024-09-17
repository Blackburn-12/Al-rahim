import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProblemDiscussion,
  toggleDropdown,
  toggleMemberSelection,
} from "../redux/slices/formSlice";
import towelImg from "../assets/background.jpg";
import moment from "moment";
import { toast } from "react-toastify";
import logo from "../assets/logomain.png";

const ProblemDiscussionForm = ({ navigate, prevStep }) => {
  const dispatch = useDispatch();
  const { problemDiscussion, dropdownStates } = useSelector(
    (state) => state.form.formData
  );

  const { dateOccurred, problemStatement, containmentAction, memberRCA } =
    problemDiscussion;
  const { isOpenMember } = dropdownStates;

  const handleDateChange = (event) => {
    const formattedDate = moment(event.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    dispatch(
      updateProblemDiscussion({
        ...problemDiscussion,
        dateOccurred: formattedDate,
      })
    );
  };

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const toggleDropdownMember = () => {
    dispatch(toggleDropdown("isOpenMember"));
  };

  // older thingi
  // const handleMemberClick = (member) => {
  //   dispatch(
  //     updateProblemDiscussion({
  //       ...problemDiscussion,
  //       memberRCA: member,
  //     })
  //   );
  //   dispatch(toggleDropdown("isOpenMember"));
  // };

  // newer thingi
  const handleMemberClick = (option) => {
    dispatch(toggleMemberSelection(option));
  };

  const handleProblemStatementChange = (event) => {
    dispatch(
      updateProblemDiscussion({
        ...problemDiscussion,
        problemStatement: event.target.value,
      })
    );
    adjustTextareaHeight(event);
  };

  const handleContainmentActionChange = (event) => {
    dispatch(
      updateProblemDiscussion({
        ...problemDiscussion,
        containmentAction: event.target.value,
      })
    );
    adjustTextareaHeight(event);
  };

  const handleNextPrev = () => {
    prevStep();
  };

  const handleNextClick = () => {
    // Log the current state of the form fields
    console.log("Date Occurred:", dateOccurred);
    console.log("Problem Statement:", problemStatement);
    console.log("Containment Action:", containmentAction);
    console.log("Member RCA:", memberRCA);

    // Perform validation
    if (
      dateOccurred &&
      problemStatement.trim() !== "" &&
      containmentAction.trim() !== "" &&
      memberRCA !== "Select member of RCA" &&
      memberRCA !== ""
    ) {
      // Log success message
      console.log(
        "All required fields are filled. Proceeding to the next step."
      );

      // Proceed to the next step
      navigate();
    } else {
      // Log error message
      console.error("Validation failed: Please fill in all required fields.");

      // Show an error toast if any required field is missing
      toast.error("Please fill in all required fields.");
    }
  };

  const memberOptions = [
    "Lewis Hamilton",
    "Max Verstappen",
    "Charles Leclerc",
    "Lando Norris",
    "Sergio Perez",
    "George Russell",
    "Fernando Alonso",
    "Carlos Sainz",
    "Esteban Ocon",
    "Pierre Gasly",
  ];

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
          Problem Discussion
        </h2>
        <div className="flex items-center justify-between">
          <div className="font-Poppins text-[20px]">CAPA Module</div>
        </div>

        <div className="relative mt-6 w-full">
          <p className="font-Poppins text-gray-700">Problem Occurring Date</p>
          <input
            type="date"
            value={
              dateOccurred ? moment(dateOccurred).format("YYYY-MM-DD") : ""
            }
            onChange={handleDateChange}
            className="font-Montserrat block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Problem Statement Date"
          />
        </div>

        <div className="relative mt-6 mb-4">
          <textarea
            value={problemStatement}
            onChange={handleProblemStatementChange}
            className="font-Poppins block w-full py-2 pr-10 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 overflow-y-auto custom-scrollbar"
            placeholder="Problem Statement"
            rows={1}
          />
        </div>

        <div className="relative mt-6 mb-4">
          <textarea
            value={containmentAction}
            onChange={handleContainmentActionChange}
            className="font-Poppins block w-full py-2 pr-10 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 overflow-y-auto custom-scrollbar"
            placeholder="Containment Action"
            rows={1}
          />
        </div>

        {/* <div className="mb-4 mt-4 relative inline-block text-left w-full">
          <button
            onClick={toggleDropdownMember}
            className="w-full font-Poppins rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-100 text-lg font-medium text-black text-left hover:bg-gray-200 focus:outline-none"
            aria-expanded={isOpenMember}
            aria-haspopup="true"
          >
            {memberRCA || "Select member of RCA"}
          </button>
          {isOpenMember && (
            <div
              className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              tabIndex="-1"
            >
              <div className="py-1 space-y-2" role="none">
                {memberOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center px-4 py-2 space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={problemDiscussion.memberRCA.includes(option)}
                      onChange={() => handleMemberClick(option)} // Trigger the toggle action
                    />
                    <label className="font-Poppins text-black text-lg cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>



            </div>
          )}
        </div> */}

<div className="mb-4 mt-4 relative inline-block text-left w-full">
  <button
    onClick={toggleDropdownMember}
    className="w-full font-Poppins rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-100 text-lg font-medium text-black text-left hover:bg-gray-200 focus:outline-none"
    aria-expanded={isOpenMember}
    aria-haspopup="true"
  >
    {memberRCA.length === 0 ? "Select member of RCA" : memberRCA.join(", ")}
  </button>
  
  {isOpenMember && (
    <div
      className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      tabIndex="-1"
    >
      <div className="py-1 space-y-2" role="none">
        {memberOptions.map((option) => (
          <label
            key={option}
            className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={problemDiscussion.memberRCA.includes(option)}
              onChange={() => handleMemberClick(option)}
            />
            <span className="font-Poppins text-black text-lg">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )}
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

export default ProblemDiscussionForm;
