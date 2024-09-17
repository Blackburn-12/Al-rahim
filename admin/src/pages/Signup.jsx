import React from "react";
import {Navbar, Footer} from "../components/index";

const Signup = () => {
  return (
    <>
    <Navbar/>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
          <form className="flex flex-col">
            <input
              type="text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
            />
            <input
              type="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
            />
            <div className="flex items-center justify-between flex-wrap">
              <label htmlFor="terms-and-conditions" className="text-sm text-gray-900 cursor-pointer">
                <input type="checkbox" id="terms-and-conditions" className="mr-2" />
                I agree to the Terms and Conditions
              </label>
              <p className="text-gray-900 mt-4">
                Already have an account?{" "}
                <a href="#" className="text-sm text-blue-500 -200 hover:underline mt-4">
                  Login
                </a>
              </p>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;