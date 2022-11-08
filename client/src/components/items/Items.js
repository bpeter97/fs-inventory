import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";
import TextFieldGroup from "./../forms/TextFieldGroup";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	ListGroup,
	ListGroupItem,
} from "reactstrap";

import {
	getItems,
	postItem,
	deleteItem,
	updateItem,
} from "../../redux/actions/itemActions";

import { getPrograms } from "../../redux/actions/programActions";
import { getWarehouses } from "../../redux/actions/warehouseActions";

import "./Items.css";

class Items extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// programModal: false,
			// deleteCheck: false,
			// programId: null,
			newPhoto: "",
			createItemModalShow: false,
			newItem: {
				item_name: "",
				assigned: false,
				fixed_asset: false,
				description: "",
				donation: false,
				client_access: false,
				value: 0,
				location: "",
				quantity: 0,
				photo: "",
				program: "",
				warehouse: "",
			},
		};
	}

	componentDidMount() {
		this.props.getItems();
		this.props.getPrograms();
		this.props.getWarehouses();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleNewItemChange = (e) => {
		this.setState((prevState) => ({
			newItem: {
				...prevState.newItem,
				[e.target.name]:
					e.target.value === "true" || e.target.value === "false"
						? e.target.value === "true"
							? (e.target.value = true)
							: (e.target.vaule = false)
						: e.target.value,
			},
		}));
	};

	handleNewItemPhoto = (e) => {
		this.setState((prevState) => ({
			newItem: {
				...prevState.newItem,
				[e.target.name]: e.target.files[0],
			},
		}));
	};

	handlePhoto = (e) => {
		this.setState({ [e.target.name]: e.target.files[0] });
	};

	onNewSubmit = (e) => {
		e.preventDefault();

		console.log(this.state.newItem);
		this.props.postItem(this.state.newItem);
		this.props.history.push("/items");
	};

	createItemModal() {
		this.setState({
			createItemModalShow: !this.state.createItemModalShow,
			newItem: {
				item_name: "",
				assigned: false,
				fixed_asset: false,
				description: "",
				donation: false,
				client_access: false,
				value: 0,
				location: "",
				quantity: 0,
				photo: "",
				program: "",
				warehouse: "",
			},
		});
	}

	render() {
		const items = this.props.items;
		const programs = this.props.programs;
		const warehouses = this.props.warehouses;

		if (this.state.newItem.photo) {
			var previewImageUrl = URL.createObjectURL(this.state.newItem.photo);
			var previewImage = new Image();
			previewImage.src = previewImageUrl;
		}

		var crumbs = [
			{
				title: "Dashboard",
				link: "/",
			},
			{
				title: "Items",
				link: "/items",
			},
		];

		var columns = [
			{
				Header: "Photo",
				accessor: "photo",
				width: 125,
				disableFilters: true,
				Cell: ({ value }) =>
					value ? (
						<div className="text-center">
							<img src={`${value}`}></img>
						</div>
					) : (
						<div className="text-center">
							<img src={`/img/noIMG.png`}></img>
						</div>
					),
			},
			{
				Header: "Item Name",
				accessor: "item_name",
				width: 150,
				Cell: ({ value }) => <div className="text-center">{value}</div>,
			},
			{
				Header: "Quantity",
				accessor: "quantity",
				width: 50,
				Cell: ({ value }) => <div className="text-center">{value}</div>,
			},
			{
				Header: "Description",
				accessor: "description",
				width: 250,
			},
			{
				Header: "Fixed Asset",
				accessor: "fixed_asset",
				width: 50,
				Cell: ({ value }) => (
					<div className="text-center">{value ? "Yes" : "No"}</div>
				),
			},
			{
				Header: "Donation",
				accessor: "donation",
				width: 50,
				Cell: ({ value }) => (
					<div className="text-center">{value ? "Yes" : "No"}</div>
				),
			},
			{
				Header: "Assigned",
				accessor: "assigned",
				width: 50,
				Cell: ({ value }) => (
					<div className="text-center">{value ? "Yes" : "No"}</div>
				),
			},
			{
				Header: "Client Access",
				accessor: "client_access",
				width: 50,
				Cell: ({ value }) => (
					<div className="text-center">{value ? "Yes" : "No"}</div>
				),
			},
			{
				Header: "Value",
				accessor: "value",
				width: 50,
				Cell: ({ value }) => (
					<div className="text-center">${parseFloat(value)}</div>
				),
			},
			{
				Header: "Location",
				accessor: "location",
				width: 150,
				Cell: ({ value }) => <div className="text-center">{value}</div>,
			},
			{
				Header: "Program",
				accessor: "program",
				width: 100,
				Cell: ({ value }) =>
					value ? (
						<div className="text-center">{value.name}</div>
					) : (
						<div className="text-center">None</div>
					),
			},
			{
				Header: "Warehouse",
				accessor: "warehouse",
				width: 125,
				Cell: ({ value }) =>
					value ? (
						<div className="text-center">{value.name}</div>
					) : (
						<div className="text-center">None</div>
					),
			},
			{
				Header: "Actions",
				id: "edit",
				accessor: "_id",
				width: 100,
				disableFilters: true,
				Cell: ({ value }) => (
					<div>
						<button
							className="btn btn-warning btn-sm mx-1 edit-btn"
							// onClick={this.editProgramModal.bind(this, value)}
						>
							<i className="fas fa-pen-square"></i>
						</button>
						<button
							className="btn btn-danger btn-sm mx-1"
							// onClick={this.deleteCheckModal.bind(this, value)}
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
							<h1 className="h3 mb-0 text-gray-800">All Items</h1>
							<h1 className="h3 mb-0 text-gray-800">
								<Breadcrumb crumbs={crumbs} />
							</h1>
						</div>
						<div className="d-flex col justify-content-end">
							<button
								className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
								onClick={this.createItemModal.bind(this)}
							>
								New Item
							</button>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<div className="card shadow mb-4">
								<div className="card-body">
									{this.props.items.loading ? (
										<Spinner />
									) : (
										<div className="table-responsive">
											<Table
												columns={columns}
												data={items.list}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal
					show={this.state.createItemModalShow}
					dialogClassName="modal-lg"
				>
					<Modal.Header
						closeButton
						onClick={() => this.createItemModal()}
					>
						<Modal.Title>Create Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form className="user" onSubmit={this.onNewSubmit}>
							<ListGroup>
								<ListGroupItem>
									<FormGroup>
										<Label for="newItemPhoto">
											Item Photo
										</Label>
										<div
											className="text-center"
											id="pictureInput"
										>
											{previewImage ? (
												<img
													className="img-fluid"
													style={{
														maxHeight: "400px",
														maxWidth: "200px",
													}}
													alt="preview"
													src={previewImageUrl}
												></img>
											) : (
												<img
													alt="preview"
													src="/img/noIMG.png"
												></img>
											)}
											<br />
											<Input
												type="file"
												name="photo"
												id="newItemPhoto"
												divClass="mb-2 text-center"
												onChange={
													this.handleNewItemPhoto
												}
											/>
										</div>
										<FormText color="muted">
											The file must be a .png, .jpg, or
											.jpeg.
										</FormText>
									</FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<FormGroup>
										<TextFieldGroup
											placeholder="Type item name here..."
											name="item_name"
											type="text"
											label="Item Name"
											value={this.state.newItem.item_name}
											onChange={this.handleNewItemChange}
											divClass="pb-2"
										/>
									</FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<FormGroup>
										<TextFieldGroup
											placeholder="Type a description..."
											name="description"
											type="text"
											label="Description"
											help="A general description of the item"
											value={
												this.state.newItem.description
											}
											onChange={this.handleNewItemChange}
											divClass="pb-2"
										/>
									</FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<FormGroup>
										<TextFieldGroup
											placeholder="Type a location..."
											name="location"
											type="text"
											label="Location"
											help="Enter the items location"
											value={this.state.newItem.location}
											onChange={this.handleNewItemChange}
											divClass="pb-2"
										/>
									</FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<FormGroup>
										<div className="row">
											<div className="col-md-6">
												<Label for="donationSelect">
													Donation?
												</Label>
												<Input
													type="select"
													name="donation"
													id="donationSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													<option value={true}>
														Yes
													</option>
													<option value={false}>
														No
													</option>
												</Input>
											</div>
											<div className="col-md-6">
												<Label for="clientAccessSelect">
													Client Access?
												</Label>
												<Input
													type="select"
													name="client_access"
													id="clientAccessSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													<option value={true}>
														Yes
													</option>
													<option value={false}>
														No
													</option>
												</Input>
											</div>
										</div>
										<div className="row mt-2">
											<div className="col-md-6">
												<Label for="donationSelect">
													Assigned?
												</Label>
												<Input
													type="select"
													name="assigned"
													id="donationSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													<option value={true}>
														Yes
													</option>
													<option value={false}>
														No
													</option>
												</Input>
											</div>
											<div className="col-md-6">
												<Label for="clientAccessSelect">
													Fixed Asset?
												</Label>
												<Input
													type="select"
													name="fixed_asset"
													id="clientAccessSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													<option value={true}>
														Yes
													</option>
													<option value={false}>
														No
													</option>
												</Input>
											</div>
										</div>
									</FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<div className="row">
										<div className="col-md-6">
											<TextFieldGroup
												placeholder="Enter the items value..."
												name="value"
												type="number"
												label="Value"
												help="Enter the items value"
												value={this.state.newItem.value}
												onChange={
													this.handleNewItemChange
												}
												divClass="pb-2"
											/>
										</div>
										<div className="col-md-6">
											<TextFieldGroup
												placeholder="Enter the quantity..."
												name="quantity"
												type="number"
												label="Quantity"
												help="Enter the items quantity"
												value={
													this.state.newItem.quantity
												}
												onChange={
													this.handleNewItemChange
												}
												divClass="pb-2"
											/>
										</div>
									</div>
									<FormGroup></FormGroup>
								</ListGroupItem>
								<ListGroupItem>
									<FormGroup>
										<div className="row">
											<div className="col-md-6">
												<Label for="donationSelect">
													Program
												</Label>
												<Input
													type="select"
													name="program"
													id="donationSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													{programs.list.map(
														(program) => {
															return (
																<option
																	value={
																		program._id
																	}
																>
																	{
																		program.name
																	}
																</option>
															);
														}
													)}
												</Input>
											</div>
											<div className="col-md-6">
												<Label for="clientAccessSelect">
													Warehouse
												</Label>
												<Input
													type="select"
													name="warehouse"
													id="clientAccessSelect"
													onChange={
														this.handleNewItemChange
													}
												>
													<option selected>
														Select One
													</option>
													{warehouses.list.map(
														(warehouse) => {
															return (
																<option
																	value={
																		warehouse._id
																	}
																>
																	{
																		warehouse.name
																	}
																</option>
															);
														}
													)}
												</Input>
											</div>
										</div>
									</FormGroup>
								</ListGroupItem>
							</ListGroup>
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
	postItem,
	getPrograms,
	getWarehouses,
})(Items);
