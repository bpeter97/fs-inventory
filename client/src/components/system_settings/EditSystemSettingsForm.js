import React from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../forms/TextFieldGroup";

import { updateSystemSettings } from "../../redux/actions/systemSettingsActions";
import checkEmpty from "../../validation/checkEmpty";

class EditSystemSettingsForm extends React.Component {
  constructor() {
    super();
    this.state = {
        base_inspection_charge: 0,
        distance_modifier: 0,
        age_modifier: 0,
        square_footage_modifier: 0,
        pool_spa_charge: 0,
        deck_charge: 0,
        crawlspace_charge: 0
    };
  }

  componentDidMount() {
      this.fillForm(this.props.systemSettings);
      this.forceUpdate();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit = e => {
    e.preventDefault();

    const priceData = {
        _id: this.props.systemSettings._id,
        // Leaving new Number as a constructor to ensure that the values are passed as a number rather than a text string.
        // eslint-disable-next-line
        base_inspection_charge: new Number(this.state.base_inspection_charge),
        // eslint-disable-next-line
        distance_modifier: new Number(this.state.distance_modifier),
        // eslint-disable-next-line
        age_modifier: new Number(this.state.age_modifier),
        // eslint-disable-next-line
        square_footage_modifier: new Number(this.state.square_footage_modifier),
        // eslint-disable-next-line
        pool_spa_charge: new Number(this.state.pool_spa_charge),
        // eslint-disable-next-line
        deck_charge: new Number(this.state.deck_charge),
        // eslint-disable-next-line
        crawlspace_charge: new Number(this.state.crawlspace_charge),
    };

    this.props.updateSystemSettings(priceData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/admin");
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fillForm = settings => {
      this.setState({
        base_inspection_charge: settings.base_inspection_charge.$numberDecimal || 0,
        distance_modifier: settings.distance_modifier.$numberDecimal || 0,
        age_modifier: settings.age_modifier.$numberDecimal || 0,
        square_footage_modifier: settings.square_footage_modifier.$numberDecimal || 0,
        pool_spa_charge: settings.pool_spa_charge.$numberDecimal || 0,
        deck_charge: settings.deck_charge.$numberDecimal || 0,
        crawlspace_charge: settings.crawlspace_charge.$numberDecimal || 0
      });
  };

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
              label="Base Inspection Charge"
              name="base_inspection_charge"
              type="text"
              help="The base charge of an inspection."
              divClass="input-group"
              prepend="$"
              value={this.state.base_inspection_charge}
              onChange={this.onChange}
              error={errors.base_inspection_charge}
            />
            </div>
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                label="Distance Modifier"
                name="distance_modifier"
                type="text"
                help="The amount to charge per mile traveled."
                divClass="input-group"
                prepend="$"
                value={this.state.distance_modifier}
                onChange={this.onChange}
                error={errors.distance_modifier}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                label="Age Modifier"
                name="age_modifier"
                type="text"
                help="The modifier for the age of the property."
                divClass="input-group"
                prepend="$"
                value={this.state.age_modifier}
                onChange={this.onChange}
                error={errors.age_modifier}
                />
            </div>
            <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                    label="Square Footage Modifier"
                    name="square_footage_modifier"
                    type="text"
                    help="The modifier for the square footage of the property."
                    divClass="input-group"
                    prepend="$"
                    value={this.state.square_footage_modifier}
                    onChange={this.onChange}
                    error={errors.square_footage_modifier}
                    />
            </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                    label="Pool / Spa Charge"
                    name="pool_spa_charge"
                    type="text"
                    help="The charge for pool and spa inspections."
                    divClass="input-group"
                    prepend="$"
                    value={this.state.pool_spa_charge}
                    onChange={this.onChange}
                    error={errors.pool_spa_charge}
                    />
          </div>
          <div className="form-group col-md-6 text-left">
            <TextFieldGroup
                    label="Deck Charge"
                    name="deck_charge"
                    type="text"
                    help="The charge for deck inspections."
                    divClass="input-group"
                    prepend="$"
                    value={this.state.deck_charge}
                    onChange={this.onChange}
                    error={errors.deck_charge}
                    />
            </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12 text-left">
            <TextFieldGroup
                    label="Crawlspace Charge"
                    name="crawlspace_charge"
                    type="text"
                    help="The charge for crawlspace inspections."
                    divClass="input-group"
                    prepend="$"
                    value={this.state.crawlspace_charge}
                    onChange={this.onChange}
                    error={errors.crawlspace_charge}
                    />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { updateSystemSettings })(EditSystemSettingsForm);
