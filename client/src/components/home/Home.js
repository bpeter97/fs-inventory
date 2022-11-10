import React from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Pie,
	PieChart,
	Sector,
} from "recharts";
import { connect } from "react-redux";
// import { Button, Modal } from "react-bootstrap";
import Breadcrumb from "./../common/Breadcrumb";

import { getPrograms } from "../../redux/actions/programActions";
import { getWarehouses } from "../../redux/actions/warehouseActions";
import { getItems } from "../../redux/actions/itemActions";

import "./Home.css";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noteModal: false,
			createCallModal: false,
			showFilters: false,
			deleteVerification: false,
			deleteId: null,
			notes: "",
		};
	}
	componentDidMount() {
		this.props.getPrograms();
		this.props.getWarehouses();
		this.props.getItems();
	}

	render() {
		const items = this.props.items;
		const programs = this.props.programs;

		const totalAssigned = items.list.filter((item) => {
			if (item.assigned === true) {
				return true;
			}
			return false;
		}).length;

		const totalUnassigned = items.list.filter((item) => {
			if (item.assigned === false) {
				return true;
			}
			return false;
		}).length;

		const percentageOfAssigned = totalAssigned / items.list.length;

		const itemsPer = programs.list.map((program) => {
			let totalCount = items.list.filter((item) => {
				if (item.program._id === program._id) {
					return true;
				}
				return false;
			}).length;

			let assignedCount = items.list.filter((item) => {
				if (item.program._id === program._id) {
					if (item.assigned === true) {
						return true;
					}
				}
				return false;
			}).length;

			return {
				name: program.name,
				Used: assignedCount,
				Unassigned: totalCount - assignedCount,
				amt: totalCount,
			};
		});

		const totalItemsPerDept = [
			{
				name: "Admin",
				value: 4000,
			},
			{
				name: "CE",
				value: 3000,
			},
			{
				name: "IHP",
				value: 2000,
			},
			{
				name: "SHP",
				value: 2780,
			},
			{
				name: "Facilities",
				value: 1890,
			},
			{
				name: "Finance",
				value: 2390,
			},
			{
				name: "Conf. Room",
				value: 3490,
			},
			{
				name: "Barn Room",
				value: 1543,
			},
			{
				name: "Fac. Shop",
				value: 4600,
			},
			{
				name: "746 WH",
				value: 1600,
			},
			{
				name: "748 WH",
				value: 3490,
			},
		];

		const DEPT_COLORS = [
			"#FF0000",
			"#00FFFF",
			"#FFA500",
			"#A52A2A",
			"#008000",
			"#FF00FF",
			"#800080",
			"#00008B",
			"#ADD8E6",
			"#FFFF00",
			"#0000FF",
		];

		var crumbs = [
			{
				title: "Dashboard",
				link: "/",
			},
		];

		return (
			<div>
				<div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
						<a
							href="/"
							className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
						>
							<i className="fas fa-download fa-sm text-white-50"></i>{" "}
							Generate Report
						</a>
					</div>

					<div className="row">
						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Some cool statistic
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												Some great number here..
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-calendar fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-success shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
												Some cool statistic
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												Some great number here..
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-info shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
												Items Assigned vs. Unassigned
											</div>
											<div className="row no-gutters align-items-center">
												<div className="col-auto">
													<div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
														{percentageOfAssigned *
															100}
														%
													</div>
												</div>
												<div className="col">
													<div className="progress progress-sm mr-2">
														<div
															className="progress-bar bg-info"
															role="progressbar"
															style={{
																width: `${
																	percentageOfAssigned *
																	100
																}%`,
															}}
															aria-valuenow="50"
															aria-valuemin="0"
															aria-valuemax="100"
														></div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-warning shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Pending Requests
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												18
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-comments fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<div className="card shadow mb-4">
								<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 className="m-0 font-weight-bold text-primary">
										Program Inventory
									</h6>
									<div className="dropdown no-arrow">
										<a
											className="dropdown-toggle"
											href="/"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink"
										>
											<div className="dropdown-header">
												Dropdown Header:
											</div>
											<a
												className="dropdown-item"
												href="/"
											>
												Action
											</a>
											<a
												className="dropdown-item"
												href="/"
											>
												Another action
											</a>
											<div className="dropdown-divider"></div>
											<a
												className="dropdown-item"
												href="/"
											>
												Something else here
											</a>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div className="chart-area">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart
												// width={1000}
												// height={500}
												data={itemsPer}
												margin={{
													top: 20,
													right: 30,
													left: 20,
													bottom: 5,
												}}
											>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="name" />
												<YAxis />
												<Tooltip />
												<Legend />
												<Bar
													dataKey="Unassigned"
													stackId="a"
													fill="#8884d8"
												/>
												<Bar
													dataKey="Used"
													stackId="a"
													fill="#82ca9d"
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-8 col-lg-7">
							<div className="card shadow mb-4">
								<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 className="m-0 font-weight-bold text-primary">
										Asset Allotment
									</h6>
									<div className="dropdown no-arrow">
										<a
											className="dropdown-toggle"
											href="/"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink"
										>
											<div className="dropdown-header">
												Dropdown Header:
											</div>
											<a
												className="dropdown-item"
												href="/"
											>
												Action
											</a>
											<a
												className="dropdown-item"
												href="/"
											>
												Another action
											</a>
											<div className="dropdown-divider"></div>
											<a
												className="dropdown-item"
												href="/"
											>
												Something else here
											</a>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div className="chart-area">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart
												// width={1000}
												// height={500}
												data={itemsPer}
												margin={{
													top: 20,
													right: 30,
													left: 20,
													bottom: 5,
												}}
											>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="name" />
												<YAxis />
												<Tooltip />
												<Legend />
												<Bar
													dataKey="Unassigned"
													stackId="a"
													fill="#8884d8"
												/>
												<Bar
													dataKey="Used"
													stackId="a"
													fill="#82ca9d"
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-4 col-lg-5">
							<div className="card shadow mb-4">
								<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 className="m-0 font-weight-bold text-primary">
										Total Assets By Department
									</h6>
									<div className="dropdown no-arrow">
										<a
											className="dropdown-toggle"
											href="/"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
										</a>
										<div
											className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
											aria-labelledby="dropdownMenuLink"
										>
											<div className="dropdown-header">
												Dropdown Header:
											</div>
											<a
												className="dropdown-item"
												href="/"
											>
												Action
											</a>
											<a
												className="dropdown-item"
												href="/"
											>
												Another action
											</a>
											<div className="dropdown-divider"></div>
											<a
												className="dropdown-item"
												href="/"
											>
												Something else here
											</a>
										</div>
									</div>
								</div>
								<div className="card-body pb-5">
									<div className="chart-pie">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<PieChart width={400} height={400}>
												<Pie
													data={totalItemsPerDept}
													dataKey="value"
													cx="50%"
													cy="50%"
													outerRadius={80}
													fill="#8884d8"
													label
												>
													{totalItemsPerDept.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={
																	DEPT_COLORS[
																		index %
																			DEPT_COLORS.length
																	]
																}
															/>
														)
													)}
												</Pie>
												<Legend
													verticalAlign="bottom"
													height={36}
												/>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">
										Projects
									</h6>
								</div>
								<div className="card-body">
									<h4 className="small font-weight-bold">
										Server Migration{" "}
										<span className="float-right">20%</span>
									</h4>
									<div className="progress mb-4">
										<div
											className="progress-bar bg-danger"
											role="progressbar"
											style={{ width: "20%" }}
											aria-valuenow="20"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>
									<h4 className="small font-weight-bold">
										Sales Tracking{" "}
										<span className="float-right">40%</span>
									</h4>
									<div className="progress mb-4">
										<div
											className="progress-bar bg-warning"
											role="progressbar"
											style={{ width: "40%" }}
											aria-valuenow="40"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>
									<h4 className="small font-weight-bold">
										Customer Database{" "}
										<span className="float-right">60%</span>
									</h4>
									<div className="progress mb-4">
										<div
											className="progress-bar"
											role="progressbar"
											style={{ width: "60%" }}
											aria-valuenow="60"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>
									<h4 className="small font-weight-bold">
										Payout Details{" "}
										<span className="float-right">80%</span>
									</h4>
									<div className="progress mb-4">
										<div
											className="progress-bar bg-info"
											role="progressbar"
											style={{ width: "80%" }}
											aria-valuenow="80"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>
									<h4 className="small font-weight-bold">
										Account Setup{" "}
										<span className="float-right">
											Complete!
										</span>
									</h4>
									<div className="progress">
										<div
											className="progress-bar bg-success"
											role="progressbar"
											style={{ width: "100%" }}
											aria-valuenow="100"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-6 mb-4">
									<div className="card bg-primary text-white shadow">
										<div className="card-body">
											Primary
											<div className="text-white-50 small">
												#4e73df
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-success text-white shadow">
										<div className="card-body">
											Success
											<div className="text-white-50 small">
												#1cc88a
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-info text-white shadow">
										<div className="card-body">
											Info
											<div className="text-white-50 small">
												#36b9cc
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-warning text-white shadow">
										<div className="card-body">
											Warning
											<div className="text-white-50 small">
												#f6c23e
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-danger text-white shadow">
										<div className="card-body">
											Danger
											<div className="text-white-50 small">
												#e74a3b
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-secondary text-white shadow">
										<div className="card-body">
											Secondary
											<div className="text-white-50 small">
												#858796
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-light text-black shadow">
										<div className="card-body">
											Light
											<div className="text-black-50 small">
												#f8f9fc
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Dark
											<div className="text-white-50 small">
												#5a5c69
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">
										Illustrations
									</h6>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img
											className="img-fluid px-3 px-sm-4 mt-3 mb-4"
											style={{ width: "25rem" }}
											src="img/undraw_posting_photo.svg"
											alt="..."
										/>
									</div>
									<p>
										Add some quality, svg illustrations to
										your project courtesy of{" "}
										<a
											rel="nofollow"
											href="https://undraw.co/"
										>
											unDraw
										</a>
										, a constantly updated collection of
										beautiful svg images that you can use
										completely free and without attribution!
									</p>
									<a rel="nofollow" href="https://undraw.co/">
										Browse Illustrations on unDraw &rarr;
									</a>
								</div>
							</div>

							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">
										Development Approach
									</h6>
								</div>
								<div className="card-body">
									<p>
										SB Admin 2 makes extensive use of
										Bootstrap 4 utility classes in order to
										reduce CSS bloat and poor page
										performance. Custom CSS classes are used
										to create custom components and custom
										utility classes.
									</p>
									<p className="mb-0">
										Before working with this theme, you
										should become familiar with the
										Bootstrap framework, especially the
										utility classes.
									</p>
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
	items: state.items,
	warehouses: state.warehouses,
	programs: state.programs,
});

export default connect(mapStateToProps, {
	getItems,
	getPrograms,
	getWarehouses,
})(Home);
