import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import './Home.css';

import Breadcrumb from './../common/Breadcrumb';
import Spinner from './../common/Spinner';
import Table from './../common/Table';
import Alert from './../common/Alert';

import { getJobs } from './../../redux/actions/jobsActions';
import { getCalls, deleteCall } from './../../redux/actions/callActions';
import CreateCallForm from '../call/CreateCallForm';
import checkEmpty from './../../validation/checkEmpty';

function toCurrency(num) {
	return Number.parseFloat(num.$numberDecimal);
}

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noteModal: false,
			createCallModal: false,
			showFilters: false,
			deleteVerification: false,
			deleteId: null,
			notes: '',
		};
	}
	componentDidMount() {
		this.props.getJobs();
		this.props.getCalls();
	}

	handleNewCallModal() {
		this.props.history.push('/calls/new');
	}

	handleFilterShow() {
		this.setState({ showFilters: !this.state.showFilters });
	}

	editCall(id) {
		const location = {
			pathname: '/calls/edit',
			state: { id: id },
		};
		this.props.history.push(location);
	}

	deleteCall(id) {
		this.setState({
			deleteVerification: !this.state.deleteVerification,
			deleteId: id,
		});
	}

	closeCall() {
		this.setState({
			deleteVerification: !this.state.deleteVerification,
			deleteId: null,
		});
	}
	handleNoteModal(note) {
		this.setState({
			noteModal: !this.state.noteModal,
			notes: note,
		});
	}
	closeNoteModal() {
		this.setState({
			noteModal: !this.state.noteModal,
			notes: null,
		});
	}
	deleteTheCall() {
		this.props.deleteCall(this.state.deleteId);
		this.setState({ deleteVerification: !this.state.deleteVerification });
		setTimeout(() => {
			if (checkEmpty(this.state.errors)) {
				this.props.history.push('/');
			}
		}, 1000);
	}

	render() {
		// eslint-disable-next-line
		Date.prototype.formatMMDDYYYY = function () {
			return (
				this.getMonth() +
				1 +
				'/' +
				this.getDate() +
				'/' +
				this.getFullYear()
			);
		};

		const { jobs } = this.props.jobs;
		const { calls } = this.props.calls;
		const success = this.props.success;

		var crumbs = [
			{
				title: 'Dashboard',
			},
		];

		var callColumns = [
			{
				Header: 'Date',
				accessor: 'date',
				width: 20,
				Cell: (prop) => {
					let date = new Date(prop.value);
					return date.formatMMDDYYYY();
				},
			},
			{
				Header: 'F/U Date',
				accessor: 'follow_up',
				width: 20,
				Cell: (prop) => {
					let date = new Date(prop.value);
					return date.formatMMDDYYYY();
				},
			},
			{
				Header: 'Client Name',
				accessor: 'client_name',
				width: 150,
			},
			{
				Header: 'Phone Number',
				accessor: 'phone_number',
				width: 150,
			},
			{
				Header: 'Address',
				accessor: 'full_address',
				minWidth: 250,
			},
			{
				Header: 'SQ FT',
				accessor: 'square_foot',
				width: 20,
			},
			{
				Header: 'Year',
				accessor: 'year_built',
				width: 20,
			},
			// {
			//   Header: "Res Ins",
			//   accessor: "home_inspection",
			//   width: 20,
			//   Cell: props => {
			//     if(props.value) {
			//       return "Yes";
			//     } else {
			//       return "No";
			//     }
			//   }
			// },
			{
				Header: 'Crawl',
				accessor: 'crawl',
				width: 20,
				Cell: (props) => {
					if (props.value) {
						return 'Yes';
					} else {
						return 'No';
					}
				},
			},
			// {
			//   Header: "Multi",
			//   accessor: "multi_story",
			//   width: 20,
			//   Cell: props => {
			//     if(props.value) {
			//       return "Yes";
			//     } else {
			//       return "No";
			//     }
			//   }
			// },
			{
				Header: 'Pool/Spa',
				accessor: 'pool_spa',
				width: 20,
				Cell: (props) => {
					if (props.value) {
						return 'Yes';
					} else {
						return 'No';
					}
				},
			},
			{
				Header: 'Deck',
				accessor: 'deck',
				width: 20,
				Cell: (props) => {
					if (props.value) {
						return 'Yes';
					} else {
						return 'No';
					}
				},
			},
			{
				Header: 'Quote',
				accessor: 'quote',
				Cell: (props) => (
					<div> ${toCurrency(props.value).toFixed(2)} </div>
				),
				width: 100,
			},
			{
				Header: 'Actions',
				id: 'edit',
				accessor: '_id',
				width: 200,
				Cell: ({ value }) => (
					<div>
						<button
							className="btn btn-success btn-sm mx-1"
							onClick={this.deleteCall.bind(this, value)}
						>
							<i className="fas fa-exchange-alt"></i>
						</button>
						<button
							className="btn btn-warning btn-sm mx-1"
							onClick={this.editCall.bind(this, value)}
						>
							<i className="fas fa-pen-square"></i>
						</button>
						<button
							className="btn btn-danger btn-sm mx-1"
							onClick={this.deleteCall.bind(this, value)}
						>
							<i className="fas fa-minus-square"></i>
						</button>
					</div>
				),
			},
			{
				Header: 'Notes',
				id: 'notes',
				accessor: 'notes',
				width: 10,
				Cell: ({ value }) => (
					<div>
						<button
							className="btn btn-primary btn-sm mx-1"
							onClick={this.handleNoteModal.bind(this, value)}
						>
							<i class="fas fa-sticky-note"></i>
						</button>
					</div>
				),
			},
		];

		let above_limits = 0;
		let below_limits = 0;
		let alerts = [];

		if (success.status) {
			alerts.push(<Alert type="success" message={success.message} />);
		}

		var total_calls = calls.length;
		var total_jobs = jobs.length;

		return (
			<div>
				<div className="container-fluid">
					<div className="col-12">
						{alerts.map((alert) => {
							return alert;
						})}
						<Breadcrumb crumbs={crumbs} />
					</div>
					<div className="col-12">
						<div className="row">
							{/* <!-- Earnings (Monthly) Card Example --> */}
							<div className="col-xl-3 col-md-6 mb-4">
								<div className="card border-left-purple shadow h-100 py-2">
									<div className="card-body">
										<div className="row no-gutters align-items-center">
											<div className="col mr-2">
												<div className="text-xs font-weight-bold text-uppercase mb-1">
													Total Jobs
												</div>
												<div className="h5 mb-0 font-weight-bold text-gray-800">
													{total_jobs}
												</div>
											</div>
											<div className="col-auto">
												<i className="fas fa-chart-bar fa-2x text-gray-300"></i>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <!-- Tasks Card Example --> */}
							<div className="col-xl-3 col-md-6 mb-4">
								<div className="card border-left-purple shadow h-100 py-2">
									<div className="card-body">
										<div className="row no-gutters align-items-center">
											<div className="col mr-2">
												<div className="text-xs font-weight-bold text-uppercase mb-1">
													Calls This Month
												</div>
												<div className="h5 mb-0 font-weight-bold text-gray-800">
													{total_calls}
												</div>
											</div>
											<div className="col-auto">
												<i className="fa fa-phone fa-2x text-gray-300"></i>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <!-- Tasks Card Example --> */}
							<div className="col-xl-3 col-md-6 mb-4">
								<div className="card border-left-warning shadow h-100 py-2">
									<div className="card-body">
										<div className="row no-gutters align-items-center">
											<div className="col mr-2">
												<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
													Number of Products Above
													Upper Limits
												</div>
												<div className="h5 mb-0 font-weight-bold text-gray-800">
													{above_limits}
												</div>
											</div>
											<div className="col-auto">
												<i className="fab fa-stack-overflow fa-2x text-gray-300"></i>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <!-- Pending Requests Card Example --> */}
							<div className="col-xl-3 col-md-6 mb-4">
								<div className="card border-left-danger shadow h-100 py-2">
									<div className="card-body">
										<div className="row no-gutters align-items-center">
											<div className="col mr-2">
												<div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
													Number of Products Below
													Lower Limits
												</div>
												<div className="h5 mb-0 font-weight-bold text-gray-800">
													{below_limits}
												</div>
											</div>
											<div className="col-auto">
												<i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								{/* <!-- DataTales Example --> */}
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h4 className="m-0 font-weight-bold vhi-blue text-center">
											Call Log
										</h4>
									</div>
									<div className="card-body text-center">
										<div className="mb-3 d-flex justify-content-between">
											<div className="d-inline mr-auto">
												<Button
													variant="primary"
													onClick={() =>
														this.handleNewCallModal()
													}
												>
													New Call
												</Button>
											</div>
											<div className="d-inline ml-auto">
												<Button
													variant="primary"
													onClick={() =>
														this.handleFilterShow()
													}
												>
													Search
												</Button>
											</div>
										</div>

										<Modal
											show={this.state.createCallModal}
											dialogClassName="modal-lg"
										>
											<Modal.Header
												closeButton
												onClick={() =>
													this.handleNewCallModal()
												}
											>
												<Modal.Title>
													New Call
												</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<CreateCallForm
													history={this.props.history}
												/>
											</Modal.Body>
										</Modal>

										<div className="table-responsive">
											{/* Below should be this.props.item.loading */}
											{false ? (
												<Spinner />
											) : this.state.showFilters ? (
												<div>
													<div className="table-search-input-show">
														<Table
															columns={
																callColumns
															}
															data={calls}
															filterShow={true}
														/>
													</div>
													<div className="table-search-input-hide">
														<Table
															columns={
																callColumns
															}
															data={calls}
															filterShow={false}
														/>
													</div>
												</div>
											) : (
												<div>
													<div className="table-search-input-hide">
														<Table
															columns={
																callColumns
															}
															data={calls}
															filterShow={true}
														/>
													</div>
													<div className="table-search-input-show">
														<Table
															columns={
																callColumns
															}
															data={calls}
															filterShow={false}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Modal
					show={this.state.deleteVerification}
					dialogClassName="modal-lg"
				>
					<Modal.Header closeButton onClick={() => this.deleteCall()}>
						<Modal.Title>Just double checking!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to delete the call?
						<br />
						<button
							className="btn btn-success mr-3 mt-5"
							onClick={this.deleteTheCall.bind(
								this,
								this.state.deleteId,
							)}
						>
							Delete The Call
						</button>
						<button
							className="btn btn-danger mx-3 mt-5"
							onClick={this.closeCall.bind(this)}
						>
							Cancel
						</button>
					</Modal.Body>
				</Modal>
				<Modal show={this.state.noteModal} dialogClassName="modal-lg">
					<Modal.Header
						closeButton
						onClick={() => this.handleNoteModal()}
					>
						<Modal.Title>Notes</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.notes}
						<br />
						<button
							className="btn btn-danger mx-3 mt-5"
							onClick={this.closeNoteModal.bind(this)}
						>
							Close
						</button>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	jobs: state.jobs,
	calls: state.calls,
	success: state.success,
});

export default connect(mapStateToProps, { getJobs, getCalls, deleteCall })(
	Home,
);
