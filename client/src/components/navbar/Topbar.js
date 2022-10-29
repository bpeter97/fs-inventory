import React from "react";
import { connect } from "react-redux";
import "./Topbar.css";

// import { getProducts } from "../../redux/actions/productActions"
import { getNotifications } from "../../redux/actions/notificationActions";
import { logoutUser } from "./../../redux/actions/authActions";
import { markNotificationsRead } from "./../../redux/actions/notificationActions";

// components
import Notification from "./Notification";

class Topbar extends React.Component {
	componentDidMount() {
		this.props.getNotifications();
		document.addEventListener("onBlur", this.globalClickListener);
	}

	markRead = () => {
		this.props.markNotificationsRead();
		this.props.getNotifications();
	};

	onLogout = () => {
		this.props.logoutUser();
	};

	toggleSidebar = () => {
		document.getElementById("accordionSidebar").classList.toggle("toggled");
	};

	adminOption = () => {
		return (
			<div>
				<a className="dropdown-item" href="/admin">
					<i className="fas fa-unlock-alt mr-2 text-gray-400"></i>
					Admin
				</a>
				<div className="dropdown-divider"></div>
			</div>
		);
	};

	render() {
		const notifications = this.props.notifications.notifications.filter(
			(e) => {
				return e.read === false;
			}
		);

		const { user } = this.props.auth;

		return (
			<div className="nav" id="topNav">
				<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow w-100">
					{/* <!-- Sidebar Toggle (Topbar) --> */}
					<button
						id="sidebarToggleTop"
						onClick={this.toggleSidebar}
						className="btn btn-link rounded-circle mr-3"
					>
						<i className="fa fa-bars"></i>
					</button>
					<ol
						className="breadcrumb mb-4 mr-auto"
						id="topNavBreadCrumb"
					>
						<li className="breadcrumb-item title">
							Family Services Warehouse Management
						</li>
					</ol>

					{/* <!-- Topbar Navbar --> */}
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown no-arrow mx-1">
							{/* eslint-disable-next-line */}
							<button
								className="nav-link dropdown-toggle"
								id="alertsDropdown"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i className="fas fa-bell fa-fw"></i>
								{notifications.length > 0 ? (
									<span className="badge badge-danger badge-counter">
										{notifications.length}
									</span>
								) : (
									""
								)}
							</button>

							{/* <!-- Dropdown - Alerts --> */}
							<div
								className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
								aria-labelledby="alertsDropdown"
								onBlur={this.markRead}
							>
								<h6 className="dropdown-header text-center">
									NOTIFICATIONS
								</h6>
								{notifications.map((notification) => {
									var note_date = new Date(notification.date);
									const date_options = {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									};

									return (
										<Notification
											description={
												notification.description
											}
											date={note_date.toLocaleDateString(
												undefined,
												date_options
											)}
											user={notification.created_by}
											key={Math.random()}
										/>
									);
								})}
								{/* eslint-disable-next-line */}
								<a
									className="dropdown-item text-center small"
									href="/notifications"
								>
									Show All Notifications
								</a>
							</div>
						</li>

						{/* <!-- Nav Item - User Information --> */}
						<li className="nav-item dropdown no-arrow">
							{/* eslint-disable-next-line */}
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="userDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<span className="mr-2 d-none d-lg-inline">
									<strong>
										{user.first_name} {user.last_name}{" "}
										{user.suffix ? user.suffix + "." : ""}
									</strong>
								</span>
							</a>
							{/* <!-- Dropdown - User Information --> */}
							<div
								className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
								aria-labelledby="userDropdown"
							>
								{/* eslint-disable-next-line */}
								<a className="dropdown-item" href="/settings">
									<i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
									Settings
								</a>
								<div className="dropdown-divider"></div>
								{user.type === "Admin"
									? this.adminOption()
									: ""}
								<button
									className="dropdown-item"
									data-toggle="modal"
									data-target="#logoutModal"
								>
									<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
									Logout
								</button>
							</div>
						</li>
					</ul>
				</nav>

				{/* <!-- Logout Modal--> */}
				<div
					className="modal fade"
					id="logoutModal"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title"
									id="exampleModalLabel"
								>
									Ready to Leave?
								</h5>
								<button
									className="close"
									type="button"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								Select "Logout" below if you are ready to end
								your current session.
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									type="button"
									data-dismiss="modal"
								>
									Cancel
								</button>
								<button
									className="btn btn-success"
									data-dismiss="modal"
									onClick={this.onLogout}
								>
									Logout
								</button>
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
	notifications: state.notifications,
});

export default connect(mapStateToProps, {
	getNotifications,
	logoutUser,
	markNotificationsRead,
})(Topbar);
