import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refetchUser } from '../redux/slices/userSlice';
import { Loader, Navbar, Footer } from "../components/index";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(refetchUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const handleFallBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-Poppins">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex-grow mt-20">
        <GoArrowLeft
          onClick={handleFallBack}
          size={40}
          className="mb-4 cursor-pointer transition-transform duration-200 hover:bg-gray-300 hover:text-black p-2 rounded-full hover:scale-110"
        />
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name}
            </h2>
            <p className="text-gray-600 mt-2">Employee Dashboard</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Email', value: user?.email },
              { label: 'Employee Code', value: user?.employeeCode },
              { label: 'Department', value: user?.department },
              { label: 'Designation', value: user?.designation },
              { label: 'Section', value: user?.section },
              { label: 'Contact', value: user?.contact },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {item.label}
                </h3>
                <p className="text-xl text-gray-800 mt-2">
                  {item.value || 'N/A'}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`mt-10 py-4 rounded-lg text-white text-center font-semibold transition-all duration-300 ${
              user?.isAllowed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {user?.isAllowed
              ? 'You are authorized to make changes.'
              : 'You are not authorized to make changes. Please contact the administrator.'}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
