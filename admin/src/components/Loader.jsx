import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[85vh]">
        <div aria-live="assertive" role="alert" class="loader"></div>
      </div>
    </>
  );
};

export default Loader;
