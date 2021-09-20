import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import TextFieldGroup from "./../forms/TextFieldGroup";
import DateFieldGroup from "../forms/DateFieldGroup";
import "./CreateCallForm.css";
import Spinner from "./../common/Spinner";

import { createCall, updateCall } from "./../../redux/actions/callActions";
import checkEmpty from "./../../validation/checkEmpty";
import axios from "axios";

class CreateCallForm extends React.Component {
	constructor() {
		super();
		this.state = {
			date: new Date(),
			follow_up: new Date(),
			client_name: "",
			phone_number: "",
			address: "",
			city: "",
			state: "CA",
			zipcode: "",
			square_foot: 0,
			home_inspection: false,
			crawl: false,
			multi_story: false,
			pool_spa: false,
			deck: false,
			year_built: 1999,
			age: 0,
			quote: 0,
			discount: 0,
			miles: 0,
			prices: {
				grand_total: 0.0,
				less_5: 0.0,
				less_10: 0.0,
				less_15: 0.0,
				less_20: 0.0,
				less_30: 0.0,
				less_40: 0.0,
				less_50: 0.0,
				minus_50: 0.0,
			},
			charges: {
				base_inspection_charge: 0,
				distance_charge: 0,
				property_size_charge: 0,
				property_age_charge: 0,
				ancillary_charges: 0,
				discounts: 0,
			},
			loaded: false,
			loading: false,
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.errors !== state.errors) {
			state.errors = props.errors;
		}
		return null;
	}

	componentDidMount() {
		this.fillForm(this.props.call);
		this.forceUpdate();
	}

	fillForm = (callData) => {
		this.setState({
			date: new Date(callData.date),
			follow_up: new Date(callData.follow_up),
			client_name: callData.client_name,
			phone_number: callData.phone_number,
			address: callData.address,
			city: callData.city,
			state: callData.state,
			year_built: callData.year_built,
			zipcode: callData.zipcode,
			square_foot: callData.square_foot,
			discount: callData.discount.$numberDecimal,
			home_inspection: callData.home_inspection,
			crawl: callData.crawl,
			multi_story: callData.multi_story,
			pool_spa: callData.pool_spa,
			deck: callData.deck,
			quote: callData.quote.$numberDecimal,
		});
	};

	onSubmit = (e) => {
		this.setState({ errors: null });
		e.preventDefault();

		const callData = {
			date: this.state.date,
			follow_up: this.state.follow_up,
			client_name: this.state.client_name,
			phone_number: this.state.phone_number,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipcode: this.state.zipcode,
			square_foot: this.state.square_foot,
			year_built: this.state.year_built,
			discount: this.state.discount,
			home_inspection: this.state.home_inspection,
			crawl: this.state.crawl,
			multi_story: this.state.multi_story,
			pool_spa: this.state.pool_spa,
			deck: this.state.deck,
			quote: this.state.quote,
		};

		this.props.updateCall(this.props.call._id, callData);
		setTimeout(() => {
			if (checkEmpty(this.state.errors)) {
				this.props.history.push("/");
			}
		}, 1000);
	};

	getDistance = (destination) => {
		let token = "5b3ce3597851110001cf6248ede48b86cd9243b5aee182415086cc61";

		// Set default coordinates.
		let start_coords = `-119.26739628519907,36.3169857958443`;

		// Set the geocode URL
		let geocode_url = `https://api.openrouteservice.org/geocode/search?api_key=${token}&text=${destination}&size=1`;

		// Get new address' coordinates.
		var config = {
			method: "get",
			url: geocode_url,
			headers: {},
		};

		axios(config)
			.then((res) => {
				// Set the end coordinates and new URL
				let end_coords = `${res.data.features[0].geometry.coordinates[0]},${res.data.features[0].geometry.coordinates[1]}`;
				let dir_url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${token}&start=${start_coords}&end=${end_coords}`;

				let newConfig = {
					method: "get",
					url: dir_url,
					headers: {},
				};
				// Get the distance between the two coordinates.
				axios(newConfig)
					.then((res) => {
						// Convert yards into miles.
						// eslint-disable-next-line
						let yards = new Number(
							res.data.features[0].properties.summary.distance
						);
						// eslint-disable-next-line
						let miles = new Number(
							parseFloat(yards / 1760).toFixed(2)
						);

						// Make it a round trip!
						let newMiles = miles * 2;

						this.setState({ miles: newMiles });
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	calculateFees = (e) => {
		this.setState({ loading: true });

		// Erase the errors
		this.setState({ errors: null });

		// Set the settings variable
		let settings = this.props.settings;

		// Base is pulled from SystemSettings.
		let base = parseFloat(settings.base_inspection_charge.$numberDecimal);

		// Get the property size charge, square footage multiplied by square_footage_modifier.
		let property_size_charge = parseFloat(
			this.props.settings.square_footage_modifier.$numberDecimal *
				this.state.square_foot
		);

		// Calculate additional charges (pool, deck, crawlspace, etc.)
		let ancillary_charges = 0;

		if (this.state.crawl)
			// eslint-disable-next-line
			ancillary_charges =
				ancillary_charges +
				new Number(settings.crawlspace_charge.$numberDecimal);
		if (this.state.pool_spa)
			// eslint-disable-next-line
			ancillary_charges =
				ancillary_charges +
				new Number(settings.pool_spa_charge.$numberDecimal);
		if (this.state.deck)
			// eslint-disable-next-line
			ancillary_charges =
				ancillary_charges +
				new Number(settings.deck_charge.$numberDecimal);

		// Calculate the property age charge, adjusted for size and age).
		// eslint-disable-next-line
		let age =
			new Number(new Date().getFullYear()) -
			new Number(new Date(this.state.year_built).getFullYear()) -
			1;
		let modified_age = age * settings.age_modifier.$numberDecimal;
		let property_age_charge = (property_size_charge * modified_age) / 100;

		// Get driving distance
		let destination = `${this.state.address}, ${this.state.city}, ${this.state.state}, ${this.state.zipcode}`;
		this.getDistance(destination);

		setTimeout(() => {
			let distance_charge = 0;

			if (this.state.miles <= 10) {
				distance_charge = 10;
			} else {
				distance_charge =
					this.state.miles *
					settings.distance_modifier.$numberDecimal;
			}

			// Calculate the grand total tax.
			let grand_total =
				base +
				distance_charge +
				property_size_charge +
				property_age_charge +
				ancillary_charges -
				// eslint-disable-next-line
				new Number(this.state.discount);

			// Set the prices.
			let prices = {
				grand_total: grand_total,
				less_5: grand_total - grand_total * 0.05,
				less_10: grand_total - grand_total * 0.1,
				less_15: grand_total - grand_total * 0.15,
				less_20: grand_total - grand_total * 0.2,
				less_30: grand_total - grand_total * 0.3,
				less_40: grand_total - grand_total * 0.4,
				less_50: grand_total - grand_total * 0.5,
				minus_50: grand_total - 50.0,
			};

			let charges = {
				base_inspection_charge: base,
				distance_charge: distance_charge,
				property_size_charge: property_size_charge,
				property_age_charge: property_age_charge,
				ancillary_charges: ancillary_charges,
				// eslint-disable-next-line
				discounts: new Number(this.state.discount),
			};

			this.setState({
				prices: prices,
				loading: false,
				loaded: true,
				charges: charges,
			});
		}, 2000);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onDateChange = (newDate, whichDate) => {
		if (whichDate === "date") {
			this.setState({ date: newDate });
		} else if (whichDate === "follow-up") {
			this.setState({ follow_up: newDate });
		}
	};

	handleChecked = (e) => {
		const state = this.state;

		if (!state[e.target.id]) {
			document.getElementById(e.target.id).checked = true;
		} else {
			document.getElementById(e.target.id).checked = false;
		}

		this.setState({
			[e.target.id]: !state[e.target.id],
		});
	};

	render() {
		const { errors } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-4 text-left">
						<DateFieldGroup
							date={this.state.date}
							onChange={(e) => this.onDateChange(e, "date")}
							label="Call Date"
							help="The date the call was received."
						/>
					</div>
					<div className="form-group col-md-4 text-left">
						<DateFieldGroup
							date={this.state.follow_up}
							onChange={(e) => this.onDateChange(e, "follow-up")}
							label="Follow-Up Date"
							help="The date to place the follow-up call."
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-4 text-left">
						<TextFieldGroup
							label="Name"
							placeholder="John Doe"
							name="client_name"
							type="text"
							help="The client's name."
							value={this.state.client_name}
							onChange={this.onChange}
							error={errors.client_name}
						/>
					</div>
					<div className="form-group col-md-4 text-left">
						<TextFieldGroup
							label="Phone Number"
							placeholder="555-555-5555"
							name="phone_number"
							value={this.state.phone_number}
							type="text"
							help="The client's phone number."
							onChange={this.onChange}
							error={errors.phone_number}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="Address"
							placeholder="1234 S Some Street"
							name="address"
							type="text"
							value={this.state.address}
							help="The client's address."
							onChange={this.onChange}
							error={errors.address}
						/>
					</div>
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="City"
							placeholder="City"
							name="city"
							value={this.state.city}
							type="text"
							help="The client's city."
							onChange={this.onChange}
							error={errors.city}
						/>
					</div>
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="State"
							placeholder="CA"
							value={this.state.state}
							name="state"
							type="text"
							help="The client's state."
							onChange={this.onChange}
							error={errors.state}
						/>
					</div>
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="Zipcode"
							placeholder="Zipcode"
							value={this.state.zipcode}
							name="zipcode"
							type="text"
							help="The client's zipcode."
							onChange={this.onChange}
							error={errors.zipcode}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="Square Feet"
							placeholder="ex. 1700"
							name="square_foot"
							value={this.state.square_foot}
							type="text"
							help="The properties square feet."
							onChange={this.onChange}
							error={errors.square_foot}
						/>
					</div>
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="Year Built"
							placeholder="ex. 1982"
							name="year_built"
							value={this.state.year_built}
							type="text"
							help="The year the property was built."
							onChange={this.onChange}
							error={errors.year_built}
						/>
					</div>
				</div>
				<div className="form-row mt-4">
					<div className="form-group col-md-3 text-left">
						<TextFieldGroup
							label="Discounts"
							divClass="input-group"
							placeholder="ex. 50"
							name="discount"
							value={this.state.discount}
							prepend="$"
							type="number"
							help='The discount given to a customer (do not include the "-").'
							onChange={this.onChange}
							error={errors.discount}
						/>
					</div>
				</div>
				<div className="form-row mt-4">
					<div className="form-group col-md-4 text-center">
						<label className="text-center">Crawl Space</label>
						<label className="switch switch-left-right">
							<input
								type="checkbox"
								className="switch-input"
								id="crawl"
								onChange={this.handleChecked}
								checked={this.state.crawl}
								value={this.state.crawl}
								name="crawl"
							/>
							<span
								className="switch-label"
								data-on="Yes"
								data-off="No"
							></span>{" "}
							<span className="switch-handle"></span>
						</label>
					</div>
					<div className="form-group col-md-4 text-center">
						<label className="text-center">Deck</label>
						<label className="switch switch-left-right">
							<input
								type="checkbox"
								className="switch-input"
								id="deck"
								onChange={this.handleChecked}
								checked={this.state.deck}
								value={this.state.deck}
								name="deck"
							/>
							<span
								className="switch-label"
								data-on="Yes"
								data-off="No"
							></span>{" "}
							<span className="switch-handle"></span>
						</label>
					</div>
					<div className="form-group col-md-4 text-center">
						<label className="text-center">Pool/Spa</label>
						<label className="switch switch-left-right">
							<input
								type="checkbox"
								className="switch-input"
								id="pool_spa"
								onChange={this.handleChecked}
								checked={this.state.pool_spa}
								value={this.state.pool_spa}
								name="pool_spa"
							/>
							<span
								className="switch-label"
								data-on="Yes"
								data-off="No"
							></span>{" "}
							<span className="switch-handle"></span>
						</label>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6 text-left">
						{this.state.loading ? (
							<Spinner />
						) : this.state.loaded ? (
							<div className="table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">Charge</th>
											<th scope="col">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Base Inspection</td>
											<td>
												$
												{this.state.charges.base_inspection_charge.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Property Size Charge</td>
											<td>
												$
												{this.state.charges.property_size_charge.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>
												Distance Charge (
												{this.state.miles} miles
												roundtrip)
											</td>
											<td>
												$
												{this.state.charges.distance_charge.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>
												Property Age (Adjusted for size
												and age)
											</td>
											<td>
												$
												{this.state.charges.property_age_charge.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Ancillary Charges</td>
											<td>
												$
												{this.state.charges.ancillary_charges.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Discounts</td>
											<td>
												($
												{this.state.charges.discounts.toFixed(
													2
												)}
												)
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className="form-group col-md-6 text-left">
						{this.state.loading ? (
							<Spinner />
						) : this.state.loaded ? (
							<div className="table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">Pricing</th>
											<th scope="col">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Grand Total</td>
											<td>
												$
												{this.state.prices.grand_total.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 5%)</td>
											<td>
												$
												{this.state.prices.less_5.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 10%)</td>
											<td>
												$
												{this.state.prices.less_10.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 15%)</td>
											<td>
												$
												{this.state.prices.less_15.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 20%)</td>
											<td>
												$
												{this.state.prices.less_20.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 30%)</td>
											<td>
												$
												{this.state.prices.less_30.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 40%)</td>
											<td>
												$
												{this.state.prices.less_40.toFixed(
													2
												)}
											</td>
										</tr>
										<tr>
											<td>Grand Total (less 50%)</td>
											<td>
												$
												{this.state.prices.less_50.toFixed(
													2
												)}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-4 text-left">
						<TextFieldGroup
							label="Quote"
							divClass="input-group"
							placeholder=""
							prepend="$"
							name="quote"
							type="text"
							help="The client's quote."
							value={this.state.quote}
							onChange={this.onChange}
							error={errors.quote}
						/>
					</div>
				</div>
				<div className="text-center pt-4 d-flex justify-content-between">
					<Button
						variant="primary"
						onClick={() => this.calculateFees()}
					>
						Calculate Quote
					</Button>
					<button type="submit" className="btn btn-success">
						Update
					</button>
				</div>
			</form>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	status: state.status,
	system_settings: state.system_settings,
	errors: state.errors,
});

export default connect(mapStateToProps, { createCall, updateCall })(
	CreateCallForm
);
