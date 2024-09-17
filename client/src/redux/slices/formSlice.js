// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   formData: {
//     capaNumber: null,
//     eventSelection: {
//       rootCause: "",
//       causeCategory: "",
//       otherDetail: "",
//       isOpenEvent: false,
//       isOpenDetail: false,
//     },
//     productDetails: {
//       customer: "Select a Customer",
//       brand: "Select a Brand",
//       productType: "Select a Product Type",
//       towelType: "Select a Towel Type",
//       article: "Select an Article",
//       size: "",
//       color: "",
//       design: "",
//       productId: "",
//       sos: "",
//       customerPO: "",
//       otherBrand: "",
//       otherCustomer: "", 
//       otherProductType: "", 
//       otherTowelType: "", 
//       otherArticle: "", 
//     },
//     dropdownStates: {
//       isOpenCustomer: false,
//       isOpenBrand: false,
//       isOpenProductType: false,
//       isOpenIfTowel: false,
//       isOpenArticle: false,
//     },
//     problemDiscussion: {
//       dateOccurred: "",
//       problemStatement: "",
//       containmentAction: "",
//       memberRCA: [],
//     },
//     rcaFor6Ms: {
//       method: [{ value: "" }],
//       material: [{ value: "" }],
//       machine: [{ value: "" }],
//       manpower: [{ value: "" }],
//       measurement: [{ value: "" }],
//       milieu: [{ value: "" }],
//     },
//     correctiveAction: "", // Added if needed
//     preventiveAction: "", // Added if needed
//     isApproved: false // Added if needed
//   },
//   loading: false,
//   error: null,
// };

// export const submitForm = createAsyncThunk(
//   "form/submitForm",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       // Ensure rcaFor6Ms is an object
//       const rcaFor6Ms = formData.rcaFor6Ms || {};

//       // Map rcaFor6Ms fields to arrays of strings
//       const mappedRcaFor6Ms = Object.fromEntries(
//         Object.entries(rcaFor6Ms).map(([key, value]) => [
//           key,
//           value.map((item) => item.value),
//         ])
//       );

//       const postData = {
//         ...formData,
//         rcaFor6Ms: mappedRcaFor6Ms,
//       };

//       // Remove correctiveAction and preventiveAction if not approved
//       if (!formData.isApproved) {
//         delete postData.correctiveAction;
//         delete postData.preventiveAction;
//       }

//       console.log("Post data before submission:", postData);

//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/posts`,
//         postData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data; // Ensure this matches the expected structure of the API response
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const message = error.response?.data?.message || error.message || "An unknown error occurred";
//       return rejectWithValue(message); // Ensure error handling
//     }
//   }
// );


// const formSlice = createSlice({
//   name: "form",
//   initialState,
//   reducers: {
//     updateEventSelection: (state, action) => {
//       state.formData.eventSelection = {
//         ...state.formData.eventSelection,
//         ...action.payload,
//       };
//     },
//     updateProductDetails: (state, action) => {
//       state.formData.productDetails = {
//         ...state.formData.productDetails,
//         ...action.payload,
//       };
//     },
//     toggleDropdown: (state, action) => {
//       state.formData.dropdownStates[action.payload] =
//         !state.formData.dropdownStates[action.payload];
//     },
//     updateProblemDiscussion: (state, action) => {
//       state.formData.problemDiscussion = {
//         ...state.formData.problemDiscussion,
//         ...action.payload,
//       };
//     },
//     updateRcaFor6Ms: (state, action) => {
//       state.formData.rcaFor6Ms = {
//         ...state.formData.rcaFor6Ms,
//         ...action.payload,
//       };
//     },
//     addRcaField: (state, action) => {
//       const { category } = action.payload;
//       state.formData.rcaFor6Ms[category].push({ value: "" });
//     },
//     removeRcaField: (state, action) => {
//       const { category, index } = action.payload;
//       state.formData.rcaFor6Ms[category].splice(index, 1);
//     },
//     updateCorrectiveAction: (state, action) => {
//       state.formData.correctiveAction = {
//         ...state.formData.correctiveAction,
//         ...action.payload,
//       };
//     },
//     updatePreventiveAction: (state, action) => {
//       state.formData.preventiveAction = {
//         ...state.formData.preventiveAction,
//         ...action.payload,
//       };
//     },
//     resetForm: (state) => {
//       state.formData = initialState.formData; // Reset form data to the initial state
//     },
//   },
// });

// export const {
//   updateEventSelection,
//   updateProblemDiscussion,
//   updateRcaFor6Ms,
//   addRcaField,
//   removeRcaField,
//   updateCorrectiveAction,
//   updatePreventiveAction,
//   resetForm,
//   updateProductDetails,
//   toggleDropdown,
// } = formSlice.actions;

// export default formSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  formData: {
    capaNumber: null,
    eventSelection: {
      rootCause: "",
      causeCategory: "",
      otherDetail: "",
      isOpenEvent: false,
      isOpenDetail: false,
    },
    productDetails: {
      customer: "Select a Customer",
      brand: "Select a Brand",
      productType: "Select a Product Type",
      towelType: "Select a Towel Type",
      article: "Select an Article",
      size: "",
      color: "",
      design: "",
      productId: "",
      sos: "",
      customerPO: "",
      otherBrand: "",
      otherCustomer: "",
      otherProductType: "",
      otherTowelType: "",
      otherArticle: "",
    },
    dropdownStates: {
      isOpenCustomer: false,
      isOpenBrand: false,
      isOpenProductType: false,
      isOpenIfTowel: false,
      isOpenArticle: false,
    },
    problemDiscussion: {
      dateOccurred: "",
      problemStatement: "",
      containmentAction: "",
      memberRCA: [], // Updated to store selected members as an array
    },
    rcaFor6Ms: {
      method: [{ value: "" }],
      material: [{ value: "" }],
      machine: [{ value: "" }],
      manpower: [{ value: "" }],
      measurement: [{ value: "" }],
      milieu: [{ value: "" }],
    },
    correctiveAction: "", // Added if needed
    preventiveAction: "", // Added if needed
    isApproved: false // Added if needed
  },
  loading: false,
  error: null,
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Ensure rcaFor6Ms is an object
      const rcaFor6Ms = formData.rcaFor6Ms || {};

      // Map rcaFor6Ms fields to arrays of strings
      const mappedRcaFor6Ms = Object.fromEntries(
        Object.entries(rcaFor6Ms).map(([key, value]) => [
          key,
          value.map((item) => item.value),
        ])
      );

      const postData = {
        ...formData,
        rcaFor6Ms: mappedRcaFor6Ms,
      };

      // Remove correctiveAction and preventiveAction if not approved
      if (!formData.isApproved) {
        delete postData.correctiveAction;
        delete postData.preventiveAction;
      }

      console.log("Post data before submission:", postData);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Ensure this matches the expected structure of the API response
    } catch (error) {
      console.error("Error submitting form:", error);
      const message = error.response?.data?.message || error.message || "An unknown error occurred";
      return rejectWithValue(message); // Ensure error handling
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateEventSelection: (state, action) => {
      state.formData.eventSelection = {
        ...state.formData.eventSelection,
        ...action.payload,
      };
    },
    updateProductDetails: (state, action) => {
      state.formData.productDetails = {
        ...state.formData.productDetails,
        ...action.payload,
      };
    },
    toggleDropdown: (state, action) => {
      state.formData.dropdownStates[action.payload] =
        !state.formData.dropdownStates[action.payload];
    },
    updateProblemDiscussion: (state, action) => {
      state.formData.problemDiscussion = {
        ...state.formData.problemDiscussion,
        ...action.payload,
      };
    },
    // Action for handling checkbox selection of multiple members
    toggleMemberSelection: (state, action) => {
      const selectedMember = action.payload;
      const currentSelections = state.formData.problemDiscussion.memberRCA;

      if (currentSelections.includes(selectedMember)) {
        // If already selected, remove the member
        state.formData.problemDiscussion.memberRCA = currentSelections.filter(
          (member) => member !== selectedMember
        );
      } else {
        // If not selected, add the member
        state.formData.problemDiscussion.memberRCA = [
          ...currentSelections,
          selectedMember,
        ];
      }
    },
    updateRcaFor6Ms: (state, action) => {
      state.formData.rcaFor6Ms = {
        ...state.formData.rcaFor6Ms,
        ...action.payload,
      };
    },
    addRcaField: (state, action) => {
      const { category } = action.payload;
      state.formData.rcaFor6Ms[category].push({ value: "" });
    },
    removeRcaField: (state, action) => {
      const { category, index } = action.payload;
      state.formData.rcaFor6Ms[category].splice(index, 1);
    },
    updateCorrectiveAction: (state, action) => {
      state.formData.correctiveAction = {
        ...state.formData.correctiveAction,
        ...action.payload,
      };
    },
    updatePreventiveAction: (state, action) => {
      state.formData.preventiveAction = {
        ...state.formData.preventiveAction,
        ...action.payload,
      };
    },
    resetForm: (state) => {
      state.formData = initialState.formData; // Reset form data to the initial state
    },
  },
});

export const {
  updateEventSelection,
  updateProblemDiscussion,
  updateRcaFor6Ms,
  addRcaField,
  removeRcaField,
  updateCorrectiveAction,
  updatePreventiveAction,
  resetForm,
  updateProductDetails,
  toggleDropdown,
  toggleMemberSelection, // Export the new action
} = formSlice.actions;

export default formSlice.reducer;
