import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";
import TextFieldGroup from "./../forms/TextFieldGroup";

import {
	getWarehouses,
	postWarehouse,
	deleteWarehouse,
	updateWarehouse,
} from "../../redux/actions/warehouseActions";

import "./Warehouses.css";

class Warehouse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			warehouseModal: false,
			deleteCheck: false,
			warehouseId: null,
			warehouseName: "",
			createWarehouseModalShow: false,
		};
	}

	componentDidMount() {
		this.props.getWarehouses();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	editWarehouseModal = (id) => {
		var warehouse = this.props.warehouses.list.find(
			(element) => element._id === id
		);

		this.setState({
			warehouseName: warehouse.name,
			warehouseId: id,
			warehouseModal: !this.state.warehouseModal,
		});
	};

	closeWarehouse() {
		this.setState({
			warehouseModal: !this.state.warehouseModal,
			warehouseId: null,
		});
	}

	createWarehouseModal() {
		this.setState({
			createWarehouseModalShow: !this.state.createWarehouseModalShow,
			warehouseName: null,
		});
	}

	deleteCheckModal(id) {
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			warehouseId: id,
		});
	}

	closeDeleteCheckModal(id) {
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			warehouseId: null,
		});
	}

	deleteWarehouseModal() {
		this.props.deleteWarehouse(this.state.warehouseId);
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			warehouseId: null,
		});
		setTimeout(() => {
			this.props.history.push("/warehouses");
		}, 1000);
	}

	onEditSubmit = (e) => {
		e.preventDefault();
		//sadad
		this.props.updateWarehouse(this.state.warehouseId, {
			name: this.state.warehouseName,
		});
		this.props.history.push("/warehouses");
	};

	onNewSubmit = (e) => {
		e.preventDefault();

		this.props.postWarehouse({ name: this.state.warehouseName });
		this.props.history.push("/warehouses");
	};

	render() {
		const warehouses = this.props.warehouses;

		var crumbs = [
			{
				title: "Dashboard",
				link: "/",
			},
			{
				title: "Admin",
				link: "#",
			},
			{
				title: "Warehouses",
				link: "/warehouses",
			},
		];

		var columns = [
			{
				Header: "Warehouse Name",
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
							className="btn btn-warning btn-sm mx-1 edit-btn"
							onClick={this.editWarehouseModal.bind(this, value)}
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
							<h1 className="h3 mb-0 text-gray-800">
								Warehouses
							</h1>
							<h1 className="h3 mb-0 text-gray-800">
								<Breadcrumb crumbs={crumbs} />
							</h1>
						</div>
						<div className="d-flex col justify-content-end">
							<button
								className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
								onClick={this.createWarehouseModal.bind(this)}
							>
								New Warehouses
							</button>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<div className="card shadow mb-4">
								<div className="card-body">
									{this.props.warehouses.loading ? (
										<Spinner />
									) : (
										<div className="table-responsive">
											<Table
												columns={columns}
												data={warehouses.list}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<Modal
						show={this.state.warehouseModal}
						dialogClassName="modal-lg"
					>
						<Modal.Header
							closeButton
							onClick={() => this.closeWarehouse()}
						>
							<Modal.Title>Edit Warehouse</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form className="user" onSubmit={this.onEditSubmit}>
								<TextFieldGroup
									placeholder="Type name here..."
									name="warehouseName"
									type="text"
									label="Warehouse Name"
									value={this.state.warehouseName}
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
							<Modal.Title>Delete Warehouse</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you would like to delete the warehouse?
							<br />
							<button
								className="btn btn-success mr-3 mt-5"
								onClick={this.deleteWarehouseModal.bind(this)}
							>
								Delete The Warehouse
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
						show={this.state.createWarehouseModalShow}
						dialogClassName="modal-lg"
					>
						<Modal.Header
							closeButton
							onClick={() => this.createWarehouseModal()}
						>
							<Modal.Title>Create Warehouse</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form className="user" onSubmit={this.onNewSubmit}>
								<TextFieldGroup
									placeholder="Type name here..."
									name="warehouseName"
									type="text"
									label="Warehouse Name"
									value={this.state.warehouseName}
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
	warehouses: state.warehouses,
});

export default connect(mapStateToProps, {
	getWarehouses,
	postWarehouse,
	deleteWarehouse,
	updateWarehouse,
})(Warehouse);
