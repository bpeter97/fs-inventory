import React from "react";
import { connect } from "react-redux";

import TextFieldGroup from "./../forms/TextFieldGroup";
import Alert from "../common/Alert";

import { createStatus } from "./../../redux/actions/statusActions";
import checkEmpty from "./../../validation/checkEmpty";

class CreateStatusForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: "",
      initials: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit = e => {
    this.setState({errors: null});
    e.preventDefault();

    const statusData = {
      label: this.state.label,
      initials: this.state.initials,
    };
    this.props.createStatus(statusData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        if(this.props.history.location.pathname === '/admin') {
            window.location.reload();
        } else {
            this.props.history.push("/status");
        }
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const { statusSuccess } = this.props.status;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              label="Label"
              placeholder="Example"
              name="label"
              type="text"
              help="The label of the status."
              onChange={this.onChange}
              error={errors.label}
            />
          </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                label="Initials"
                placeholder="EX"
                name="initials"
                type="text"
                help="The initials of the status."
                onChange={this.onChange}
                error={errors.initials}
              />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Create</button>
        <div className="my-4">
            {statusSuccess ? <Alert type="success" message={statusSuccess} /> : ""}
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.status,
  errors: state.errors
});

export default connect(mapStateToProps, { createStatus })(CreateStatusForm);
