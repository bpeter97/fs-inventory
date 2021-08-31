import React from "react";
import { connect } from "react-redux";

import "./NewCall.css";

import Breadcrumb from "../common/Breadcrumb";
import CreateCallForm from "../call/CreateCallForm";

import { getSystemSettings } from "./../../redux/actions/systemSettingsActions";

class NewCall extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSystemSettings();
  }

  render() {
    
    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "New Call",
      },
    ];

    let alerts = [];

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
                      New Call
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <div className="table-responsive">
                        <CreateCallForm history={this.props.history} />
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
  system_settings: state.system_settings
});

export default connect(mapStateToProps, { getSystemSettings })(NewCall);
