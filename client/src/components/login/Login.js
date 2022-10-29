import React from "react";
import { connect } from "react-redux";
import "./Login.css";

import { loginUser } from "./../../redux/actions/authActions";

// import TextFieldGroup from "../forms/TextFieldGroup";
// import Alert from "../common/Alert";

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
		document.getElementById("accordionSidebar").style.display = "none";
	}

	componentWillUnmount() {
		document.getElementById("topNav").style.display = "block";
		document.getElementById("accordionSidebar").style.display = "block";
		document.getElementById("content-wrapper").style.backgroundColor =
			"#fff";
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
		return (
			<section>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-10 col-lg-12 col-md-9">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									<div className="row">
										<div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
										<div className="col-lg-6">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">
														Family Services
														Warehouse
													</h1>
												</div>
												{/* <form onSubmit={this.onSubmit}>
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
															className="btn btn-primary mt-2 w-100"
															value="Login"
															name="login"
														/>
													</div>
												</form> */}
												<form
													className="user"
													onSubmit={this.onSubmit}
												>
													<div className="form-group">
														<input
															type="text"
															className="form-control form-control-user"
															placeholder="Enter Username..."
															name="username"
															value={
																this.state
																	.username
															}
															onChange={
																this.onChange
															}
														/>
													</div>
													<div className="form-group">
														<input
															type="password"
															className="form-control form-control-user"
															placeholder="Password"
															name="password"
															value={
																this.state
																	.password
															}
															onChange={
																this.onChange
															}
														/>
													</div>
													<input
														type="submit"
														className="btn btn-primary btn-user btn-block"
														value="Login"
													/>
												</form>
												{/* <div className="text-center">
													<a
														className="small"
														href="forgot-password.html"
													>
														Forgot Password?
													</a>
												</div>
												<div className="text-center">
													<a
														className="small"
														href="register.html"
													>
														Create an Account!
													</a>
												</div> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

// 	render() {
// 		const { errors } = this.props;

// 		var login_error = "";
// 		if (errors.login) {
// 			login_error = <Alert type="danger" message={errors.login} />;
// 		}

// 		return (
// 			<div class="container" id="loginBox">
// 				<div class="row justify-content-center h-100">
// 					<div class="col-xl-10 col-lg-12 col-md-9">
// 						<div class="card o-hidden border-0 shadow-lg my-5">
// 							<div class="card-body p-0">
// 								{/* <!-- Nested Row within Card Body --> */}
// 								<div class="row">
// 									<div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
// 									<div class="col-lg-6">
// 										<div class="p-5">
// 											<div class="text-center">
// 												<h1 class="h4 text-gray-900 mb-4">
// 													Welcome!
// 												</h1>
// 											</div>
//
// 											<hr />
// 											<div class="text-center">
// 												<a
// 													class=""
// 													href="forgot-password.html"
// 												>
// 													Forgot Password?
// 												</a>
// 											</div>
// 											<div class="text-center">
// 												<a class="" href="/register">
// 													Create an Account!
// 												</a>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = (state) => ({
// 	auth: state.auth,
// 	errors: state.errors,
// });

// export default connect(mapStateToProps, { loginUser })(Login);
