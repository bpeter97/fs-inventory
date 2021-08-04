import React from "react";
import { connect } from "react-redux";
import {Button, Modal} from 'react-bootstrap';

import "./Admin.css";

import Breadcrumb from "../common/Breadcrumb";
import Spinner from "../common/Spinner";
import Table from "../common/Table";
import CreateStatusForm from "../status/CreateStatusForm";

import { getStatuses } from "../../redux/actions/statusActions";

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
  }

  render() {
    const { statuses } = this.props.status;

    var crumbs = [
      {
        title: "Dashboard",
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
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a className="nav-link active" href="#pills-status" data-toggle="tab" role="tab">Status</a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-status" role="tabpanel" aria-labelledby="pills-status-tab">
                      <div className="text-left">
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
                        {/* <button type="button" className="btn btn-primary mb-3" onClick={this.handleCreateStatusModal()}>Create Status</button> */}
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
});

export default connect(mapStateToProps, { getStatuses })(Admin);
