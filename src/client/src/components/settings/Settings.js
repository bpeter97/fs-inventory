import React from "react";
import { connect } from "react-redux";
import "./Settings.css";

import Breadcrumb from "./../common/Breadcrumb";

import {
  updateSettings,
  getSettings,
} from "./../../redux/actions/settingsActions";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      notifications: false,
    };
  }

  componentDidMount() {
    this.props.getSettings(this.props.auth.user.settings);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.settings._id !== prevState._id) {
      return {
        _id: nextProps.settings._id,
        notifications: nextProps.settings.notifications,
      };
    }
    return null;
  }

  onNotificationChange = (e) => {
    const state = this.state;

    if (!state.notifications) {
      document.getElementById("notifications").checked = true;
    } else {
      document.getElementById("notifications").checked = false;
    }

    this.setState(
      {
        notifications: !state.notifications,
      }
    );
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      _id: this.state._id,
      notifications: this.state.notifications,
    };
    this.props.updateSettings(data);
  };

  render() {
    let checked;
    
    if (this.state.notifications === true) {
      checked = true;
    } else {
      checked = false;
    }

    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Settings",
      },
    ];

    return (
      <div>
        <div className="form-groups">
          <div className="col-12">
            <Breadcrumb crumbs={crumbs} />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold vhi-purple text-center">
                      Settings
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <form onSubmit={this.onSubmit}>
                      <div className="d-flex">
                        <div className="col">
                          <span className="">
                            Notifications
                            <small className="form-text text-muted">
                              This turns on and off notifications.
                            </small>
                          </span>
                        </div>
                        <div className="col">
                          <label className="switch switch-left-right">
                            <input
                              type="checkbox"
                              className="switch-input"
                              id="notifications"
                              onChange={this.onNotificationChange}
                              checked={checked}
                              name="notifications"
                            />
                            <span
                              className="switch-label"
                              data-on="On"
                              data-off="Off"
                            ></span>{" "}
                            <span className="switch-handle"></span>
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success mt-4">
                        Save
                      </button>
                    </form>
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
  auth: state.auth,
  user: state.user,
  settings: state.settings.settings,
});

export default connect(mapStateToProps, { updateSettings, getSettings })(
  Settings
);
