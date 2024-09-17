import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS
import { loginUser } from "../redux/slices/userSlice";
import { Navbar, Footer } from "../components/index";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userInfo) {
      toast.success("Login successful!");
      navigate("/");
      location.reload();
    }
    if (error) {
      toast.error(error);
    }
  }, [userInfo, error, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return; 
    }

    dispatch(loginUser(formData));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[85vh] mt-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-Poppins">
            Login
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="bg-gray-100 font-Poppins text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="bg-gray-100 font-Poppins text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#005b70] text-white font-Poppins py-2 rounded-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </>
  );
};

export default Login;
