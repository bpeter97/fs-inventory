import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";

import { getPrograms } from "../../redux/actions/programActions";

import "./Programs.css";

class Program extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			programModal: false,
			deleteCheck: false,
			programId: null,
		};
	}

	componentDidMount() {
		this.props.getPrograms();
	}

	editProgram(id) {
		this.setState({
			programModal: !this.state.programModal,
			programId: id,
		});
	}

	closeProgram() {
		this.setState({
			programModal: !this.state.programModal,
			programId: null,
		});
	}

	deleteCheckModal(id) {
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			programId: id,
		});
	}

	closeDeleteCheckModal(id) {
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			programId: null,
		});
	}

	deleteProgram() {
		console.log(this.state.programId);
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			programId: null,
		});
	}

	render() {
		const programs = this.props.programs;

		var crumbs = [
			{
				title: "Dashboard",
				link: "/",
			},
			{
				title: "Programs",
				link: "/programs",
			},
		];

		var columns = [
			{
				Header: "Program Name",
				accessor: "name",
				width: 250,
			},
			{
				Header: "Actions",
				id: "edit",
				accessor: "_id",
				width: 50,
				Cell: ({ value }) => (
					<div>
						<button
							className="btn btn-warning btn-sm mx-1"
							onClick={this.editProgram.bind(this, value)}
						>
							<i className="fas fa-pen-square"></i>
						</button>
						<button
							className="btn btn-danger btn-sm mx-1"
							onClick={this.deleteCheckModal.bind(this, value)}
						>
							<i className="fas fa-minus-square"></i>
						</button>
					</div>
				),
			},
		];

		return (
			<div>
				<div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between">
						<div className="col">
							<h1 className="h3 mb-0 text-gray-800">Programs</h1>
							<h1 className="h3 mb-0 text-gray-800">
								<Breadcrumb crumbs={crumbs} />
							</h1>
						</div>
						<div className="d-flex col justify-content-end">
							<a
								href="/"
								className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
							>
								<i className="fas fa-download fa-sm text-white-50"></i>{" "}
								New Program
							</a>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<div className="card shadow mb-4">
								<div className="card-body">
									{this.props.programs.loading ? (
										<Spinner />
									) : (
										<div className="table-responsive">
											<Table
												columns={columns}
												data={programs.list}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<Modal
						show={this.state.programModal}
						dialogClassName="modal-lg"
					>
						<Modal.Header
							closeButton
							onClick={() => this.closeDeleteCheckModal()}
						>
							<Modal.Title>Edit Program</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Form Goes Here: {this.state.programId}
							{/* <CreateCallForm
								history={this.props.history}
							/> */}
						</Modal.Body>
					</Modal>

					<Modal
						show={this.state.deleteCheck}
						dialogClassName="modal-lg"
					>
						<Modal.Header
							closeButton
							onClick={() => this.deleteCheckModal()}
						>
							<Modal.Title>Delete Program</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you would like to delete the program?
							<br />
							<button
								className="btn btn-success mr-3 mt-5"
								onClick={this.deleteProgram.bind(this)}
							>
								Delete The Call
							</button>
							<button
								className="btn btn-danger mx-3 mt-5"
								onClick={this.deleteCheckModal.bind(this)}
							>
								Cancel
							</button>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	programs: state.programs,
});

export default connect(mapStateToProps, { getPrograms })(Program);
