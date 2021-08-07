import React from "react";
import { connect } from "react-redux";

import TextFieldGroup from "./../forms/TextFieldGroup";
import Alert from "../common/Alert";
import DateFieldGroup from "../forms/DateFieldGroup";
import "./CreateCallForm.css";

// import { createCall } from "./../../redux/actions/callActions";
import checkEmpty from "./../../validation/checkEmpty";

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
      quote: 0,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit = e => {
    this.state.errors = null;
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
      home_inspection: this.state.home_inspection,
      crawl: this.state.crawl,
      multi_story: this.state.multi_story,
      pool_spa: this.state.pool_spa,
      deck: this.state.deck,
      quote: this.state.quote,
    };

    console.log(callData);
    // this.props.createCall(callData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/");
      }
    }, 1000);
  };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onDateChange = newDate => {
        this.setState({ date: newDate });
    }

    onFollowUpChange = newDate => {
        this.setState({ follow_up: newDate });
    }

    handleChecked = e => {
        const state = this.state;
    
        if (!state[e.target.id]) {
            document.getElementById(e.target.id).checked = true;
        } else {
            document.getElementById(e.target.id).checked = false;
        }
    
        this.setState(
            {
                [e.target.id]: !state[e.target.id],
            }
        );
    }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <DateFieldGroup 
                date={this.state.date} 
                onChange={this.onDateChange} 
                label="Call Date"
                help="The date the call was received."
            />
          </div>
          <div className="form-group col-md-6 text-left">
            <DateFieldGroup 
                date={this.state.follow_up} 
                onChange={this.onDateChange} 
                label="Follow-Up Date" 
                help="The date to place the follow-up call."
            />
          </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Name"
                    placeholder="John Doe"
                    name="client_name"
                    type="text"
                    help="The client's name."
                    onChange={this.onChange}
                    error={errors.client_name}
                />
            </div>
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Phone Number"
                    placeholder="555-555-5555"
                    name="phone_number"
                    type="text"
                    help="The client's phone number."
                    onChange={this.onChange}
                    error={errors.phone_number}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Address"
                    placeholder="1234 S Some Street"
                    name="address"
                    type="text"
                    help="The client's address."
                    onChange={this.onChange}
                    error={errors.address}
                />
            </div>
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="City"
                    placeholder="City"
                    name="city"
                    type="text"
                    help="The client's city."
                    onChange={this.onChange}
                    error={errors.city}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="State"
                    placeholder="CA"
                    value="CA"
                    name="state"
                    type="text"
                    help="The client's state."
                    onChange={this.onChange}
                    error={errors.state}
                />
            </div>
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Zipcode"
                    placeholder="Zipcode"
                    name="zipcode"
                    type="text"
                    help="The client's zipcode."
                    onChange={this.onChange}
                    error={errors.zipcode}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Square Feet"
                    placeholder="ex. 1700"
                    name="square_foot"
                    type="text"
                    help="The properties square feet."
                    onChange={this.onChange}
                    error={errors.square_foot}
                />
            </div>
            <div className="form-group col-md-6 text-left">
                <TextFieldGroup
                    label="Quote"
                    divClass="input-group"
                    placeholder="1234.97"
                    prepend="$"
                    name="quote"
                    type="number"
                    help="The client's quote."
                    onChange={this.onChange}
                    error={errors.quote}
                />
            </div>
        </div>
        <div className="form-row mt-2">
            <div className="form-group col-md-3 text-center">
                <label className="text-center">Res Insp.</label>
                <label className="switch switch-left-right">
                    <input
                        type="checkbox"
                        className="switch-input"
                        id="home_inspection"
                        onChange={this.handleChecked}
                        checked={this.state.home_inspection}
                        name="home_inspection"
                    />
                    <span
                        className="switch-label"
                        data-on="Yes"
                        data-off="No"
                    ></span>{" "}
                    <span className="switch-handle"></span>
                </label>
            </div>
            <div className="form-group col-md-3 text-center">
                <label className="text-center">Crawl Space</label>
                <label className="switch switch-left-right">
                    <input
                        type="checkbox"
                        className="switch-input"
                        id="crawl"
                        onChange={this.handleChecked}
                        checked={this.state.crawl}
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
            <div className="form-group col-md-3 text-center">
                <label className="text-center">Multi-Story</label>
                <label className="switch switch-left-right">
                    <input
                        type="checkbox"
                        className="switch-input"
                        id="multi_story"
                        onChange={this.handleChecked}
                        checked={this.state.multi_story}
                        name="multi_story"
                    />
                    <span
                        className="switch-label"
                        data-on="Yes"
                        data-off="No"
                    ></span>{" "}
                    <span className="switch-handle"></span>
                </label>
            </div>
            <div className="form-group col-md-3 text-center">
                <label className="text-center">Pool/Spa</label>
                <label className="switch switch-left-right">
                    <input
                        type="checkbox"
                        className="switch-input"
                        id="pool_spa"
                        onChange={this.handleChecked}
                        checked={this.state.pool_spa}
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
        <div className="text-center pt-4">
            <button type="submit" className="btn btn-success">Create</button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.status,
  errors: state.errors
});

export default connect(mapStateToProps, { })(CreateCallForm);
