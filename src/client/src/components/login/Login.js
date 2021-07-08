import React from "react";
import { connect } from "react-redux";
import "./Login.css";

import { loginUser } from "./../../redux/actions/authActions";

import TextFieldGroup from "../forms/TextFieldGroup";
import Alert from "../common/Alert";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.props;

    var login_error = "";
    if(errors.login) {
      login_error = (<Alert type="danger" message={errors.login} />)
    }

    return (
      <div class="container" id="loginBox">
        <div class="row justify-content-center h-100">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome!</h1>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        {login_error}                      
                        <TextFieldGroup
                          placeholder="Username"
                          name="username"
                          type="username"
                          value={this.state.username}
                          onChange={this.onChange}
                          error={errors.username}
                          divClass="pb-2"
                        />
                        <TextFieldGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                          divClass="pt-2"
                        />
                        <div className="d-flex justify-content-center mt-2">
                          <input
                            type="submit"
                            className="btn btn-success mt-2 w-100"
                            value="Login"
                            name="login"
                          />
                        </div>
                      </form>
                      <hr />
                      <div class="text-center">
                        <a class="" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div class="text-center">
                        <a class="" href="/register">
                          Create an Account!
                        </a>
                      </div>
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

export default connect(mapStateToProps, { loginUser })(Login);
