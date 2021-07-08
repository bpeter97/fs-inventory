import React from "react";
import classnames from "classnames";

import "./TextFieldGroup.css";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  type,
  onChange,
  disabled,
  divClass,
  help,
  error,
  prepend,
  step
}) => {
  if (divClass) {
  }
  let smallText = null;
  let prependDiv = null;
  let prependId = label + "123456";
  let newLabel = null;

  if (help) {
    smallText = <small className="form-text text-muted">{help}</small>;
  }

  if(prepend) {
    prependDiv = (
      <div className="input-group-prepend">
        <span className="input-group-text" id={prependId}>{prepend}</span>
      </div>
    )
  }

  if(label) {
    newLabel = (
      <label>{label}</label>
    );
  }

  return (
    <div>
      {newLabel}
      <div className={classnames(divClass ? divClass : "")}>
      {prependDiv}
      <input
        type={type}
        className={classnames("form-control")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={prependId}
        step={step}
      />
      </div>
      {smallText}
      {error ? (
        <div
          className="alert small-alert show shadow alert-danger"
          role="alert"
        >
          <small>{error}</small>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
