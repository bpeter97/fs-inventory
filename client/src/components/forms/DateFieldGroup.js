import React from "react";
import classnames from "classnames";
import DatePicker from "react-datepicker/dist/react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./DateFieldGroup.css";

const DateFieldGroup = ({
    label,
    date,
    onChange,
    disabled,
    divClass,
    help,
    error,
    prepend
}) => {
    let smallText = null;
    let prependDiv = null;
    let prependId = label + "123456";
    let newLabel = null;

    if (help) {
        smallText = <small className="form-text text-muted small-text">{help}</small>;
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
        <label className="form-label">{label}</label>
        );
    }

    return (
        <div>
            {newLabel}
            <div className={classnames(divClass ? divClass : "")}>
                {prependDiv}
                <DatePicker selected={date} onChange={onChange} className="form-control w-100" disabled={disabled}/>
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
}

export default DateFieldGroup;