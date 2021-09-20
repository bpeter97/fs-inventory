import React from "react";
import { connect } from "react-redux";
import {Button, Modal} from 'react-bootstrap';

import "./Admin.css";

import Breadcrumb from "../common/Breadcrumb";
import Spinner from "../common/Spinner";
import Table from "../common/Table";
import EditSystemSettingsForm from "../system_settings/EditSystemSettingsForm";
import CreateStatusForm from "../status/CreateStatusForm";

import { getStatuses } from "../../redux/actions/statusActions";
import { getSystemSettings } from "../../redux/actions/systemSettingsActions";
import Alert from "./../common/Alert";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createStatusModal: false
    }
  }

  handleCreateStatusModal() {
    this.setState({ createStatusModal: !this.state.createStatusModal });
  }

  componentDidMount() {
    this.props.getStatuses();
    this.props.getSystemSettings();
  }

  render() {
    const { statuses } = this.props.status;
    const { system_settings } = this.props.system_settings;
    const { success } = this.props;

    let form = "";
		if (system_settings.length === 0 ) {
			form = <Spinner />;
		} else {
			form = (
				<EditSystemSettingsForm history={this.props.history} systemSettings={this.props.system_settings.system_settings} />
			);
		}

    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Admin",
      },
    ];

    var statusColumns = [
      {
        Header: "Label",
        accessor: "label",
        width: 150,
      },
      {
        Header: "Initials",
        accessor: "initials",
        width: 150,
      }
    ];

    let alerts = [];

    if(success.status) {
      alerts.push(<Alert type="success" message={success.message} />);
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
                      System Configuration
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-systemsettings-tab" data-toggle="tab" data-target="#nav-systemsettings" type="button" role="tab" aria-controls="nav-systemsettings" aria-selected="true">System Settings</button>
                        <button className="nav-link" id="nav-status-tab" data-toggle="tab" data-target="#nav-status" type="button" role="tab" aria-controls="nav-status" aria-selected="false">Status Settings</button>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-systemsettings" role="tabpanel" aria-labelledby="nav-systemsettings-tab">
                        {form}
                      </div>
                      <div className="tab-pane fade" id="nav-status" role="tabpanel" aria-labelledby="nav-status-tab">
                        <div className="text-left mt-3">
                          <div className="mb-3">
                            <Button variant="primary" onClick={() => this.handleCreateStatusModal()}>
                              Create Status
                            </Button>
                          </div>

                          <Modal show={this.state.createStatusModal} dialogClassName="modal-lg">
                            <Modal.Header closeButton onClick={() => this.handleCreateStatusModal()}>
                              <Modal.Title>Create a Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <CreateStatusForm history={this.props.history} />
                            </Modal.Body>
                          </Modal>
                        </div>
                        <div className="table-responsive">
                          {/* Below should be this.props.item.loading */}
                          {false ? (
                            <Spinner />
                          ) : (
                            <div className="table-responsive">
                              <Table columns={statusColumns} data={statuses} />
                            </div>
                          )}
                        </div>
                      </div>
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
  status: state.status,
  system_settings: state.system_settings,
  success: state.success
});

export default connect(mapStateToProps, { getStatuses, getSystemSettings })(Admin);
