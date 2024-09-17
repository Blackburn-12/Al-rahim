import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/slices/userSlice"; // Import the resetPassword slice
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUserInfo = () => {
  const [email, setEmail] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if email, employeeCode, and newPassword are not empty
    if (!email || !employeeCode || !newPassword) {
      toast.error("All fields are required.", {
        position: toast.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    try {
      const resultAction = await dispatch(resetPassword({ email, employeeCode, newPassword }));

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password updated successfully!", {
          position: toast.TOP_RIGHT,
          autoClose: 3000,
        });
        navigate("/")
      } else {
        toast.error("Invalid email or employee code.", {
          position: toast.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.", {
        position: toast.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Navbar />
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

        <div className="absolute top-[55%] lg:top-[55%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0">
          <h2 className="font-Poppins text-[36px] font-bold mb-4">Reset Password</h2>

          {error && (
            <p className="text-red-500 text-xs italic mb-4 font-Poppins text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Email
              </label>
            </div>

            <div className="relative mb-4">
              <input
                id="employeeCode"
                type="text"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="employeeCode"
                className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Employee Code
              </label>
            </div>

            <div className="relative mb-4">
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                New Password
              </label>
            </div>

            <button
              type="submit"
              className="font-Poppins bg-primary-button text-white px-4 py-2 rounded hover:bg-primary-button-hover w-full mt-4"
            >
              Reset Password
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditUserInfo;
