import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, editUserInfo } from "../redux/slices/userSlice";
import { Navbar, Footer, Loader } from "../components";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: name === "isAllowed" ? JSON.parse(value) : value,
    }));
  };

  const handleSave = () => {
    if (selectedUser) {
      dispatch(editUserInfo(selectedUser))
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((err) => {
          console.error("Failed to update user:", err);
        });
    }
  };

  const filteredUsers = users?.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 font-Poppins">
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-Poppins"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading && <p><Loader/></p>}
        {error && <p className="text-red-500">{error.message}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Name",
                  "Email",
                  "Department",
                  "Section",
                  "Employee Code",
                  "Contact",
                  "Designation",
                  "Allowed",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b border-gray-300 font-semibold text-center align-middle"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition-colors duration-300"
                >
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.department}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.section}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.employeeCode}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.contact}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.designation}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    {user.isAllowed ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 align-middle text-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {isModalOpen && selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 font-Poppins"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Edit User Information
            </h2>
            {/* Form Inputs */}
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Department", name: "department", type: "text" },
              { label: "Section", name: "section", type: "text" },
              { label: "Employee Code", name: "employeeCode", type: "text" },
              { label: "Contact", name: "contact", type: "text" },
              { label: "Designation", name: "designation", type: "text" },
              {
                label: "Allowed",
                name: "isAllowed",
                type: "select",
                options: [
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ],
              },
            ].map(({ label, name, type, options }) => (
              <div key={name} className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor={name}
                >
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    value={selectedUser[name]?.toString() || ""}
                    onChange={handleInputChange}
                    className="form-select mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={selectedUser[name] || ""}
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditUserInfo;
