import React from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../forms/TextFieldGroup";
import SelectInput from "../forms/SelectInput";

import { createUser } from "../../redux/actions/userActions";
import checkEmpty from "../../validation/checkEmpty";

class CreateUserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      suffix: "",
      position: "",
      email: "",
      errors: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      suffix: this.state.suffix,
      position: this.state.position,
      email: this.state.email,
    };

    this.props.createUser(userData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/users");
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    let positionSelect = [
      { value: null, selected: true, label: "Select Your Position" },
      { value: "Management", selected: false, label: "Manager" },
      { value: "Yard Foreman", selected: false, label: "Yard Foreman" },
      {
        value: "Modification Specialist",
        selected: false,
        label: "Modification Specialist",
      },
      { value: "Shop Employee", selected: false, label: "Shop Employee" },
      { value: "Driver", selected: false, label: "Driver" },
    ];

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              placeholder="Username"
              label="Username"
              name="username"
              type="username"
              help="The username of the new user."
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            </div>
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              placeholder="Password"
              label="Password"
              name="password"
              type="password"
              help="The password of the new user."
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              placeholder="First Name"
              label="First Name"
              name="first_name"
              type="text"
              help="The first name of the new user."
              value={this.state.first_name}
              onChange={this.onChange}
              error={errors.first_name}
            />
            </div>
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              placeholder="Last Name"
              label="Last Name"
              name="last_name"
              help="The last name of the new user."
              type="text"
              value={this.state.last_name}
              onChange={this.onChange}
              error={errors.last_name}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              label="Suffix"
              placeholder="Suffix"
              name="suffix"
              type="text"
              help="The suffix of the new user."
              value={this.state.suffix}
              onChange={this.onChange}
              error={errors.suffix}
              className="form-control"
            />
            </div>
            <div className="form-group col-md-6 text-left">
            <SelectInput
              className="form-control"
              selectId="Position"
              label="Position"
              name="position"
              help="The position of the new user."
              onChange={this.onChange}
              options={positionSelect}
              error={errors.position}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12 text-left">
            <TextFieldGroup
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              help="The email of the new user."
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createUser })(CreateUserForm);
