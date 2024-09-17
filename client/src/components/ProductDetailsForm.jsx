import React from "react";
import { useDispatch, useSelector } from "react-redux";
import towelImg from "../assets/background.jpg";
import {
  updateProductDetails,
  toggleDropdown,
} from "../redux/slices/formSlice";
import { toast } from "react-toastify"; // Import Toastify
import logo from "../assets/logomain.png";

const ProductDetailsForm = ({ navigate, prevStep }) => {
  const dispatch = useDispatch();
  const { productDetails, dropdownStates } = useSelector(
    (state) => state.form.formData
  );

  const handleNextClick = () => {
    const {
      customer,
      brand,
      productType,
      towelType,
      article,
      size,
      color,
      design,
      productId,
      sos,
      customerPO,
    } = productDetails;

    if (
      customer &&
      brand &&
      productType &&
      towelType &&
      article &&
      size &&
      color &&
      design &&
      productId &&
      sos &&
      customerPO &&
      brand !== "Select a Brand" &&
      productType !== "Select a Product Type" &&
      towelType !== "Select a Towel Type" &&
      article !== "Select an Article"
    ) {
      console.log({
        productDetails: {
          customer,
          brand,
          productType,
          towelType,
          article,
          size,
          color,
          design,
          productId,
          sos,
          customerPO,
        },
      });
      navigate(); // Calls the navigate function passed from parent
    } else {
      toast.error("Please fill in all required fields."); // Show error toast
    }
  };

  const handleNextPrev = () => {
    prevStep();
  };

  const customerOptions = [
    "TARGET",
    "WALMART",
    "JC PENNEY",
    "PRIMARK",
    "OTHERS",
  ];
  const brandOptions = ["THRESHOLD", "ROOM ESSENTIAL", "OTHER"];
  const productTypeOptions = [
    "YARN",
    "TRIMS AND ACCESSORIES",
    "PACKAGING",
    "DYES",
    "CHEMICALS",
    "TOWELS",
    "OTHERS",
  ];
  const ifTowelOptions = [
    "SOLID TOWEL",
    "YARN DYE TOWEL",
    "PRINTED TOWEL",
    "WHITE",
    "OTHERS",
  ];
  const articleOptions = [
    "BEACH TOWEL",
    "BATH TOWEL",
    "HAND TOWEL",
    "KITCHEN TOWEL",
    "GUEST TOWEL",
    "WASH CLOTH",
    "BATH MATT",
    "BATHROBE",
    "GLOVES",
    "PONCHO",
    "TURBAN",
    "BATH SHEET",
    "BABY BIB",
  ];

  const handleDropdownToggle = (dropdownName) => {
    dispatch(toggleDropdown(dropdownName));
  };

  const handleElementClick = (value, field) => {
    dispatch(updateProductDetails({ [field]: value }));
    handleDropdownToggle(
      `isOpen${field.charAt(0).toUpperCase() + field.slice(1)}`
    );
  };

  const handleInputChange = (event, field) => {
    dispatch(updateProductDetails({ [field]: event.target.value }));
  };

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const renderDropdown = (options, field, placeholder) => (
    <div className="relative mb-4">
      <button
        type="button"
        onClick={() =>
          handleDropdownToggle(
            `isOpen${field.charAt(0).toUpperCase() + field.slice(1)}`
          )
        }
        className="w-full font-Poppins rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-gray-100 text-lg font-medium text-black text-left hover:bg-gray-200 focus:outline-none"
      >
        {productDetails[field] || placeholder}
      </button>
      {dropdownStates[
        `isOpen${field.charAt(0).toUpperCase() + field.slice(1)}`
      ] && (
        <div className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div
                key={index}
                className="font-Poppins text-black block px-4 py-2 text-lg hover:bg-[#005B70] hover:text-white cursor-pointer"
                onClick={() => handleElementClick(option, field)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderInput = (field, label, type = "text") => (
    <div className="relative mb-4 mt-4">
      <input
        id={field}
        type={type}
        min={type === "number" ? "1" : undefined}
        value={productDetails[field]}
        onChange={(event) => handleInputChange(event, field)}
        className="font-Poppins block w-full px-2 py-2 text-lg bg-transparent border-b border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={field}
        className="absolute left-0 top-2.5 text-gray-900 text-lg duration-300 transform -translate-y-6 scale-75 origin-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-gray-600 font-Poppins"
      >
        {label}
      </label>
    </div>
  );

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
      <div className="absolute top-[55%] lg:top-[55%] left-[50%] lg:left-[75%] transform -translate-x-[50%] -translate-y-[50%] lg:translate-y-[-50%] w-full lg:w-[510px] h-full lg:h-[750px] overflow-y-auto bg-white p-4 rounded-lg shadow-lg mt-20 lg:mt-0">
        <h2 className="font-Poppins text-[36px] font-bold mb-4">
          Product Details
        </h2>
        <div className="space-y-4">
          {renderDropdown(customerOptions, "customer", "Select a Customer")}
          {productDetails.customer === "OTHERS" && (
            <div className="relative mb-4">
              {renderInput("otherCustomer", "Other Customer")}
            </div>
          )}
          {renderDropdown(brandOptions, "brand", "Select a Brand")}
          {productDetails.brand === "OTHER" && (
            <div className="relative mb-4">
              {renderInput("otherBrand", "Other Brand")}
            </div>
          )}
          {renderDropdown(productTypeOptions, "productType", "Select a Product Type")}
          {productDetails.productType === "OTHERS" && (
            <div className="relative mb-4">
              {renderInput("otherProductType", "Other Product Type")}
            </div>
          )}
          {renderDropdown(ifTowelOptions, "towelType", "Select a Towel Type")}
          {productDetails.towelType === "OTHERS" && (
            <div className="relative mb-4">
              {renderInput("otherTowelType", "Other Towel Type")}
            </div>
          )}
          {renderDropdown(articleOptions, "article", "Select an Article")}
          {productDetails.article === "OTHERS" && (
            <div className="relative mb-4">
              {renderInput("otherArticle", "Other Article")}
            </div>
          )}
          {renderInput("size", "Size", "number")}
          {renderInput("color", "Color")}
          {renderInput("design", "Design")}
          {renderInput("productId", "Product ID", "number")}
          {renderInput("sos", "SOS", "number")}
          {renderInput("customerPO", "Customer PO")}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleNextPrev}
            className="font-Poppins bg-[#005B70] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#003D4C] transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            className="font-Poppins bg-[#005B70] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#003D4C] transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
