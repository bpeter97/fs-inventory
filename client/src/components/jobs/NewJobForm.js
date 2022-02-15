import React from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../forms/TextFieldGroup';
import SelectInput from '../forms/SelectInput';

// import { createUser } from '../../redux/actions/userActions';
// import checkEmpty from '../../validation/checkEmpty';

class NewJobForm extends React.Component {
	constructor() {
		super();
		this.state = {
			date: null,
			client_name: '',
			phone_number: '',
			address: '',
			city: '',
			state: '',
			zipcode: '',
			county: '',
			square_foot: 0,
			crawl: false,
			discount: 0,
			multi_story: false,
			pool_spa: true,
			deck: false,
			bedrooms: 0,
			bath: 0,
			quote: 0,
			notes: '',
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.errors !== state.errors) {
			state.errors = props.errors;
		}

		return null;
	}

	componentDidMount() {
		// Set job data using call data.
		console.log(this.props.call);
		setTimeout(() => {
			this.setState({
				client_name: this.props.call.client_name,
				phone_number: this.props.call.phone_number,
				address: this.props.call.address,
				city: this.props.call.city,
				state: this.props.call.state,
				zipcode: this.props.call.zipcode,
				county: '',
				square_foot: this.props.call.square_foot,
				crawl: this.props.call.crawl,
				discount: this.props.call.discount.$numberDecimal,
				multi_story: this.props.call.multi_story,
				pool_spa: this.props.call.pool_spa,
				deck: this.props.call.deck,
				bedrooms: 0,
				bath: 0,
				quote: this.props.call.quote.$numberDecimal,
				notes: this.props.call.notes,
			});
		}, 500);
	}

	// onSubmit = (e) => {
	// 	e.preventDefault();

	// 	const userData = {
	// 		username: this.state.username,
	// 		password: this.state.password,
	// 		first_name: this.state.first_name,
	// 		last_name: this.state.last_name,
	// 		suffix: this.state.suffix,
	// 		position: this.state.position,
	// 		email: this.state.email,
	// 	};

	// 	this.props.createUser(userData);
	// 	setTimeout(() => {
	// 		if (checkEmpty(this.state.errors)) {
	// 			this.props.history.push('/users');
	// 		}
	// 	}, 1000);
	// };

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;

		// Form checks
		var clientNameCheck = this.state.client_name !== '' ? true : false;
		var clientPhoneCheck = this.state.phone_number !== '' ? true : false;
		var clientAddressCheck = this.state.address !== '' ? true : false;
		var clientCityCheck = this.state.city !== '' ? true : false;
		var clientCountyCheck = this.state.county !== '' ? true : false;
		var clientStateCheck = this.state.state !== '' ? true : false;
		var clientZipcodeCheck = this.state.zipcode !== '' ? true : false;

		return (
			<div className="row">
				<div className="col-md-6 d-flex justify-content-center">
					<form onSubmit={this.onSubmit}>
						<div className="form-row">
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="Client"
									label="Client"
									name="client_name"
									type="client_name"
									help="The client's name."
									value={this.state.client_name}
									onChange={this.onChange}
									error={errors.client_name}
									required
								/>
							</div>
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="Phone Number"
									label="Phone Number"
									name="phone_number"
									type="phone_number"
									help="The client's phone number."
									value={this.state.phone_number}
									onChange={this.onChange}
									error={errors.phone_number}
									required
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="Address"
									label="Address"
									name="address"
									type="address"
									help="The address of the new job."
									value={this.state.address}
									onChange={this.onChange}
									error={errors.address}
									required
								/>
							</div>
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="City"
									label="City"
									name="city"
									type="city"
									help="The city of the new job."
									value={this.state.city}
									onChange={this.onChange}
									error={errors.city}
									required
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="State"
									label="State"
									name="state"
									type="state"
									help="The state of the new job."
									value={this.state.state}
									onChange={this.onChange}
									error={errors.state}
									required
								/>
							</div>
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="County"
									label="County"
									name="county"
									type="county"
									help="The county the job is located in."
									value={this.state.county}
									onChange={this.onChange}
									error={errors.county}
									required
								/>
							</div>
							<div className="form-group col-md-6 text-left">
								<TextFieldGroup
									placeholder="Zipcode"
									label="Zipcode"
									name="zipcode"
									type="zipcode"
									help="The zipcode of the new job."
									value={this.state.zipcode}
									onChange={this.onChange}
									error={errors.zipcode}
									required
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-6 d-flex justify-content-center">
					<div
						class="list-group list-group-flush w-75 mt-5"
						id="newJobChecks"
					>
						<p
							href="#"
							class="list-group-item mb-0"
							aria-current="true"
						>
							To Do:
						</p>
						<button
							href=""
							className="list-group-item list-group-item-action"
							aria-current="true"
						>
							Client Name
							{clientNameCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							Phone Number
							{clientPhoneCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							Address
							{clientAddressCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							City
							{clientCityCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							County
							{clientCountyCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							State
							{clientPhoneCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
						<button
							href="#"
							class="list-group-item list-group-item-action"
						>
							Zipcode
							{clientZipcodeCheck ? (
								<i class="fas fa-check ml-2 gbr-green"></i>
							) : (
								<i class="fas fa-exclamation-triangle red ml-2"></i>
							)}
						</button>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-3">
						<button
							type="submit"
							className="btn btn-lg btn-success"
						>
							Create
						</button>
					</div>
					{JSON.stringify(this.state.job)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

// export default connect(mapStateToProps, { createUser })(NewJobForm);
export default connect(mapStateToProps, {})(NewJobForm);
