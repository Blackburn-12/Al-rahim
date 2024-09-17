import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, Navbar, Footer } from "../components/index";
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons from react-icons

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employeeCode: "",
    department: "",
    designation: "",
    section: "",
    contact: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { login } = useAuth();
  const { loading, error } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure formData for easier reference
    const {
      name,
      email,
      password,
      employeeCode,
      department,
      designation,
      section,
      contact,
    } = formData;

    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !employeeCode ||
      !department ||
      !designation ||
      !section ||
      !contact
    ) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Exit the function early if validation fails
    }

    try {
      const user = await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // login(user.token);
      navigate("/login");
    } catch (err) {
      // Log the error to understand its structure
      console.error("Error during registration:", err);

      // Display a more general error message if err.message is not available
      toast.error(
        err?.message
          ? `Failed to register: ${err.message}`
          : "Failed to register. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
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

        <div className="absolute top-[55%] lg:top-[50%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0">
          <h2 className="font-Poppins text-[36px] font-bold mb-4">
            Sign Up
          </h2>
          {error && (
            <p className="text-red-500 text-center font-Poppins">
              {error.message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Name
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Email
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-600"
              >
                {showPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                id="employeeCode"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="employeeCode"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Employee Code
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                id="department"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="department"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Department
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                id="designation"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="designation"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Designation
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                id="section"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="section"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Section
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                id="contact"
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="contact"
                className="absolute left-0 top-2 text-gray-900 text-lg transform -translate-y-6 scale-75 origin-0 transition-all duration-200 ease-out peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Contact
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 font-Poppins w-full text-lg text-white bg-primary-button py-2 px-4 rounded hover:bg-primary-button-hover focus:outline-none"
            >
              {loading ? <Loader /> : "Sign Up"}
            </button>

            <Link to="/">
            <p className="font-Poppins mt-6 text-primary-button">
              Already have an account? Login
            </p>
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
