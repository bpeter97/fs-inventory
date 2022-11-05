import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";
import TextFieldGroup from "./../forms/TextFieldGroup";

import {
	getPrograms,
	postProgram,
	deleteProgram,
	updateProgram,
} from "../../redux/actions/programActions";

import "./Programs.css";

class Program extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			programModal: false,
			deleteCheck: false,
			programId: null,
			programName: "",
			createProgramModalShow: false,
		};
	}

	componentDidMount() {
		this.props.getPrograms();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	editProgramModal = (id) => {
		var program = this.props.programs.list.find(
			(element) => element._id === id
		);

		this.setState({
			programName: program.name,
			programId: id,
			programModal: !this.state.programModal,
		});
	};

	closeProgram() {
		this.setState({
			programModal: !this.state.programModal,
			programId: null,
		});
	}

	createProgramModal() {
		this.setState({
			createProgramModalShow: !this.state.createProgramModalShow,
			programName: null,
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

	deleteProgramModal() {
		this.props.deleteProgram(this.state.programId);
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			programId: null,
		});
		setTimeout(() => {
			this.props.history.push("/programs");
		}, 1000);
	}

	onEditSubmit = (e) => {
		e.preventDefault();

		this.props.updateProgram(this.state.programId, {
			name: this.state.programName,
		});
		this.props.history.push("/programs");
	};

	onNewSubmit = (e) => {
		e.preventDefault();

		this.props.postProgram({ name: this.state.programName });
		this.props.history.push("/programs");
	};

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
							onClick={this.editProgramModal.bind(this, value)}
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
							<button
								className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
								onClick={this.createProgramModal.bind(this)}
							>
								New Program
							</button>
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
							onClick={() => this.closeProgram()}
						>
							<Modal.Title>Edit Program</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form className="user" onSubmit={this.onEditSubmit}>
								<TextFieldGroup
									placeholder="Type name here..."
									name="programName"
									type="text"
									label="Program Name"
									value={this.state.programName}
									onChange={this.onChange}
									divClass="pb-2"
								/>
								<div className="text-center w-100 mt-5 mb-3">
									<input
										type="submit"
										className="btn btn-primary btn-user w-50"
										value="Save"
									/>
								</div>
							</form>
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
								onClick={this.deleteProgramModal.bind(this)}
							>
								Delete The Program
							</button>
							<button
								className="btn btn-danger mx-3 mt-5"
								onClick={this.deleteCheckModal.bind(this)}
							>
								Cancel
							</button>
						</Modal.Body>
					</Modal>

					<Modal
						show={this.state.createProgramModalShow}
						dialogClassName="modal-lg"
					>
						<Modal.Header
							closeButton
							onClick={() => this.createProgramModal()}
						>
							<Modal.Title>Create Program</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form className="user" onSubmit={this.onNewSubmit}>
								<TextFieldGroup
									placeholder="Type name here..."
									name="programName"
									type="text"
									label="Program Name"
									value={this.state.programName}
									onChange={this.onChange}
									divClass="pb-2"
								/>
								<div className="text-center w-100 mt-5 mb-3">
									<input
										type="submit"
										className="btn btn-primary btn-user w-50"
										value="Create"
									/>
								</div>
							</form>
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

export default connect(mapStateToProps, {
	getPrograms,
	postProgram,
	deleteProgram,
	updateProgram,
})(Program);
