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
	getItem,
	updateItem,
} from "../../redux/actions/itemActions";

import { getPrograms } from "../../redux/actions/programActions";
import { getWarehouses } from "../../redux/actions/warehouseActions";

import "./Items.css";

class Items extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			itemId: "",
			createItemModalShow: false,
			deleteItemModalShow: false,
			editItemPhotoUrl: "",
			editItem: {
				_id: "",
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

	handleEditItemChange = (e) => {
		this.setState((prevState) => ({
			editItem: {
				...prevState.editItem,
				[e.target.name]:
					e.target.value === "true" || e.target.value === "false"
						? e.target.value === "true"
							? (e.target.value = true)
							: (e.target.vaule = false)
						: e.target.value,
			},
		}));
	};

	handleEditItemPhoto = (e) => {
		var previewImageUrl = URL.createObjectURL(e.target.files[0]);

		this.setState((prevState) => ({
			editItemPhotoUrl: previewImageUrl,
			editItem: {
				...prevState.editItem,
				[e.target.name]: e.target.files[0],
			},
		}));
	};

	handlePhoto = (e) => {
		this.setState({ [e.target.name]: e.target.files[0] });
	};

	onNewSubmit = (e) => {
		e.preventDefault();

		var formData = new FormData();
		formData.append("item_name", this.state.newItem.item_name);
		formData.append("assigned", this.state.newItem.assigned);
		formData.append("fixed_asset", this.state.newItem.fixed_asset);
		formData.append("description", this.state.newItem.description);
		formData.append("donation", this.state.newItem.donation);
		formData.append("client_access", this.state.newItem.client_access);
		formData.append("value", this.state.newItem.value);
		formData.append("location", this.state.newItem.location);
		formData.append("quantity", this.state.newItem.quantity);
		formData.append("photo", this.state.newItem.photo);
		formData.append("program", this.state.newItem.program);
		formData.append("warehouse", this.state.newItem.warehouse);

		this.props.postItem(formData);
		this.props.history.push("/items");
	};

	onEditSubmit = (e) => {
		e.preventDefault();

		var formData = new FormData();
		formData.append("item_name", this.state.editItem.item_name);
		formData.append("assigned", this.state.editItem.assigned);
		formData.append("fixed_asset", this.state.editItem.fixed_asset);
		formData.append("description", this.state.editItem.description);
		formData.append("donation", this.state.editItem.donation);
		formData.append("client_access", this.state.editItem.client_access);
		formData.append("value", this.state.editItem.value);
		formData.append("location", this.state.editItem.location);
		formData.append("quantity", this.state.editItem.quantity);
		formData.append("photo", this.state.editItem.photo);
		formData.append("program", this.state.editItem.program);
		formData.append("warehouse", this.state.editItem.warehouse);

		this.props.updateItem(this.state.editItem.id, formData);
		setTimeout(() => {
			this.props.history.push("/items");
		}, 1000);
	};
	6;
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

	deleteCheckModal(id) {
		this.setState({
			deleteItemModalShow: !this.state.deleteItemModalShow,
			itemId: id,
		});
	}

	deleteTheItem() {
		this.props.deleteItem(this.state.itemId);
		this.setState({
			deleteItemModalShow: !this.state.deleteItemModalShow,
			itemId: null,
		});
		setTimeout(() => {
			this.props.history.push("/items");
		}, 1000);
	}

	editItemModal(id) {
		this.props.getItem(id);
		setTimeout(() => {
			this.setState({
				newItem: {},
				editItem: {
					id: id,
					item_name: this.props.items.item.item_name,
					assigned: this.props.items.item.assigned,
					fixed_asset: this.props.items.item.fixed_asset,
					description: this.props.items.item.description,
					donation: this.props.items.item.donation,
					client_access: this.props.items.item.client_access,
					value: this.props.items.item.value,
					location: this.props.items.item.location,
					quantity: this.props.items.item.quantity,
					photo: this.props.items.item.photo,
					program: this.props.items.item.program,
					warehouse: this.props.items.item.warehouse,
				},
				editItemModalShow: !this.state.editItemModalShow,
			});
		}, 500);
	}

	closeEditItemModal(id) {
		this.setState({
			editItem: {
				_id: "",
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
			editItemModalShow: !this.state.editItemModalShow,
		});
	}

	findWarehouse(id) {
		let warehouse = this.props.warehouses.list.find(
			(warehouse) => warehouse._id === id
		);
		if (warehouse) {
			return (
				<option selected value={warehouse._id}>
					{warehouse.name}
				</option>
			);
		} else {
			return (
				<option selected value="">
					None
				</option>
			);
		}
	}
	findProgram(id) {
		let program = this.props.programs.list.find(
			(program) => program._id === id
		);
		if (program) {
			return (
				<option selected value={program._id}>
					{program.name}
				</option>
			);
		} else {
			return (
				<option selected value="">
					None
				</option>
			);
		}
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

		if (this.state.editItem.photo) {
			var editPreviewImageUrl = `img/uploads/${this.state.editItem.photo}`;
		} else {
			var editPreviewImageUrl = `/img/noIMG.png`;
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
							<img
								className="img-fluid"
								style={{
									maxHeight: "100px",
									maxWidth: "100px",
								}}
								alt="description"
								src={`/img/uploads/${value}`}
							></img>
						</div>
					) : (
						<div className="text-center">
							<img alt="description" src={`/img/noIMG.png`}></img>
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
							onClick={this.editItemModal.bind(this, value)}
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

				{/********************* BEGINNING OF NEW ITEM MODAL *********************/}
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
						<form
							encType="multipart/form-data"
							className="user"
							onSubmit={this.onNewSubmit}
						>
							<ListGroup>
								<ListGroupItem>
									<FormGroup>
										<Label for="photo">Item Photo</Label>
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
									value="Create Item"
								/>
							</div>
						</form>
					</Modal.Body>
				</Modal>
				{/********************* END OF NEW ITEM MODAL *********************/}

				{/********************* BEGINNING OF DELETE MODAL *********************/}
				<Modal
					show={this.state.deleteItemModalShow}
					dialogClassName="modal-lg"
				>
					<Modal.Header
						closeButton
						onClick={() => this.deleteCheckModal()}
					>
						<Modal.Title>Delete Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you would like to delete the item?
						<br />
						<button
							className="btn btn-success mr-3 mt-5"
							onClick={this.deleteTheItem.bind(this)}
						>
							Delete The Item
						</button>
						<button
							className="btn btn-danger mx-3 mt-5"
							onClick={this.deleteCheckModal.bind(this)}
						>
							Cancel
						</button>
					</Modal.Body>
				</Modal>
				{/********************* END OF DELETE MODAL *********************/}

				{/********************* BEGINNING OF EDIT MODAL *********************/}
				<Modal
					show={this.state.editItemModalShow}
					dialogClassName="modal-lg"
				>
					<Modal.Header
						closeButton
						onClick={() => this.closeEditItemModal()}
					>
						<Modal.Title>
							Edit Item ({this.state.editItem.item_name})
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form
							encType="multipart/form-data"
							className="user"
							onSubmit={this.onEditSubmit}
						>
							<ListGroup>
								<ListGroupItem>
									<FormGroup>
										<Label for="photo">Item Photo</Label>
										<div
											className="text-center"
											id="pictureInput"
										>
											{this.state.editItemPhotoUrl ? (
												<img
													className="img-fluid"
													style={{
														maxHeight: "400px",
														maxWidth: "200px",
													}}
													alt="preview"
													src={
														this.state
															.editItemPhotoUrl
													}
												></img>
											) : editPreviewImageUrl ? (
												<img
													className="img-fluid"
													style={{
														maxHeight: "400px",
														maxWidth: "200px",
													}}
													alt="preview"
													src={editPreviewImageUrl}
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
												divClass="mb-2 text-center"
												onChange={
													this.handleEditItemPhoto
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
											value={
												this.state.editItem.item_name
											}
											onChange={this.handleEditItemChange}
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
												this.state.editItem.description
											}
											onChange={this.handleEditItemChange}
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
											value={this.state.editItem.location}
											onChange={this.handleEditItemChange}
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
														this
															.handleEditItemChange
													}
												>
													<option selected>
														{this.state.editItem
															.donation
															? "Yes"
															: "No"}
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
														this
															.handleEditItemChange
													}
												>
													<option selected>
														{this.state.editItem
															.client_access
															? "Yes"
															: "No"}
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
														this
															.handleEditItemChange
													}
												>
													<option selected>
														{this.state.editItem
															.assigned
															? "Yes"
															: "No"}
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
														this
															.handleEditItemChange
													}
												>
													<option selected>
														{this.state.editItem
															.fixed_asset
															? "Yes"
															: "No"}
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
												value={
													this.state.editItem.value
												}
												onChange={
													this.handleEditItemChange
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
													this.state.editItem.quantity
												}
												onChange={
													this.handleEditItemChange
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
														this
															.handleEditItemChange
													}
												>
													{this.findProgram(
														this.state.editItem
															.program
													)}
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
														this
															.handleEditItemChange
													}
												>
													{this.findWarehouse(
														this.state.editItem
															.warehouse
													)}
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
									value="Update Item"
								/>
							</div>
						</form>
					</Modal.Body>
				</Modal>
				{/********************* END OF EDIT MODAL *********************/}
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
	deleteItem,
	getItem,
	updateItem,
	getPrograms,
	getWarehouses,
})(Items);
