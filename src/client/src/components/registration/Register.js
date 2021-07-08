import React from "react";
import { connect } from "react-redux";

import { registerUser } from "./../../redux/actions/authActions";

import TextFieldGroup from "./../forms/TextFieldGroup";
import SelectInput from "../forms/SelectInput";

class Register extends React.Component {
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    document.getElementById("topNav").style.display = "none";
    document.getElementById("content-wrapper").style.backgroundColor =
      "rgb(136 136 136)";
    document.getElementById("accordionSidebar").style.display = "none";
  }

  componentWillUnmount() {
    document.getElementById("topNav").style.display = "block";
    document.getElementById("accordionSidebar").style.display = "block";
    document.getElementById("content-wrapper").style.backgroundColor = "#fff";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
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
    this.props.registerUser(userData, this.props.history);
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
      <div className="container" id="loginBox">
        <div className="row justify-content-center h-100">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-register-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Registration</h1>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                          placeholder="Username"
                          name="username"
                          type="username"
                          value={this.state.username}
                          onChange={this.onChange}
                          error={errors.username}
                        />
                        <TextFieldGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                        <TextFieldGroup
                          placeholder="First Name"
                          name="first_name"
                          type="text"
                          value={this.state.first_name}
                          onChange={this.onChange}
                          error={errors.first_name}
                        />
                        <TextFieldGroup
                          placeholder="Last Name"
                          name="last_name"
                          type="text"
                          value={this.state.last_name}
                          onChange={this.onChange}
                          error={errors.last_name}
                        />
                        <TextFieldGroup
                          placeholder="Suffix"
                          name="suffix"
                          type="text"
                          value={this.state.suffix}
                          onChange={this.onChange}
                          error={errors.suffix}
                          className="form-control"
                        />
                        <SelectInput
                          className="form-control"
                          selectId="Position"
                          name="position"
                          onChange={this.onChange}
                          options={positionSelect}
                          error={errors.position}
                        />
                        <TextFieldGroup
                          placeholder="Email"
                          name="email"
                          type="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                        <div className="d-flex justify-content-center mt-2">
                          <input
                            type="submit"
                            className="btn btn-success mt-2 w-100"
                            value="Register"
                            name="register"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
