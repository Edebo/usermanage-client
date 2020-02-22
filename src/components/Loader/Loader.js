import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-top-left"></div>
      <div className="loader-top-right"></div>
      <div className="loader-bottom-left"></div>
      <div className="loader-bottom-right"></div>
    </div>
  );
};

export default Loader;
