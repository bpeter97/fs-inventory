import React from "react";
import "./Alert.css";

const Alert = (details) => {
  let className = "alert alert-dismissible fade show shadow alert-";
  className += details.type;

  return (
    <div className={className} role="alert">
      {details.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
