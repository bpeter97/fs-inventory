import React from "react";
import { connect } from "react-redux";

import "./NewCall.css";

import Breadcrumb from "../common/Breadcrumb";
import CreateCallForm from "./CreateCallForm";

import { getSystemSettings } from "../../redux/actions/systemSettingsActions";
import { getCall } from "../../redux/actions/callActions";

import EditCallForm from "./EditCallForm";
import Spinner from "../common/Spinner";

class EditCall extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSystemSettings();

    let hasState = this.props.location.state;
		let id = "";
		if (!hasState) {
			this.props.history.push("/");
		} else {
			id = hasState.id;
			this.props.getCall(id);
		}
  }

  render() {

    const { call } = this.props.calls;
    
    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Edit Call",
      },
    ];

    let alerts = [];

    let form = "";
		if (call === null ) {
			form = <Spinner />;
		} else {
			form = (
				<EditCallForm history={this.props.history} settings={this.props.system_settings.system_settings} call={call} />
			);
		}

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
              <div className="col-12">
                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold vhi-blue text-center">
                      Edit Call
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <div className="table-responsive">
                      {form}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  system_settings: state.system_settings,
  calls: state.calls
});

export default connect(mapStateToProps, { getSystemSettings, getCall })(EditCall);
