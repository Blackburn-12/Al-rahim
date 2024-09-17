import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice"; // Import the login slice
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import { Footer, Navbar } from "../components";
import towelImg from "../assets/background.jpg";
import logo from "../assets/logomain.png";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons from react-icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { loading, error } = useSelector((state) => state.user); // Assume user slice

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if email and password are not empty
    if (!email || !password) {
        toast.error("Please fill in all fields.", {
            position: toast.TOP_RIGHT,
            autoClose: 3000,
        });
        return; // Exit the function early if validation fails
    }

    try {
        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            toast.success("Login successful!", {
                position: toast.TOP_RIGHT,
                autoClose: 3000,
            });

            login(resultAction.payload.token);
            navigate("/dashboard"); // Redirect to dashboard or a secured page
        } else {
            toast.error("Either email or password is wrong", {
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
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h2 className="font-Poppins text-[36px] font-bold mb-4">Login</h2>

          {error && (
            <p className="text-red-500 text-xs italic mb-4 font-Poppins text-center">
              {error.message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
              >
                Password
              </label>

              <Link to="/edituserinfo">
                <p className="font-Poppins text-primary-button my-6">
                  Forgot Password?
                </p>
              </Link>

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2.5 text-lg text-gray-600 focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              className="font-Poppins bg-primary-button text-white px-4 py-2 rounded hover:bg-primary-button-hover w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <Link to="/register">
            <p className="font-Poppins text-primary-button my-6">
              New here? Sign up
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
