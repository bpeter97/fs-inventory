import React from "react";
import { connect } from "react-redux";
import {Button, Modal} from 'react-bootstrap';

import "./Admin.css";

import Breadcrumb from "../common/Breadcrumb";
import Spinner from "../common/Spinner";
import Table from "../common/Table";
import CreateStatusForm from "../status/CreateStatusForm";

import { getJobs } from "../../redux/actions/jobsActions";
import { getStatuses } from "../../redux/actions/statusActions";
import { getSubSections } from "../../redux/actions/subSectionActions";

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
    this.props.getJobs();
    this.props.getStatuses();
    this.props.getSubSections();
  }

  render() {
    const { jobs } = this.props.jobs;
    const { statuses } = this.props.status;

    var crumbs = [
      {
        title: "Dashboard",
      },
    ];

    var columns = [
      {
        Header: "Job",
        accessor: "_id",
        width: 150,
      },
      {
        Header: "Address",
        accessor: "address",
        width: 150,
      },
      {
        Header: "Client",
        accessor: "client.full_name",
        width: 150,
      }
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

    var total_jobs = jobs.length;

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
              {/* <!-- Earnings (Monthly) Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-purple shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                          Total Jobs
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {total_jobs}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-chart-bar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Earnings (Annual) Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-purple shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      {/* {
                        // eslint-disable-next-line
                        products.map((product) => {
                          if (product.name === "Lockbox") {
                            return (
                              <div className="col mr-2" key={Math.random(10)}>
                                <div className="text-xs font-weight-bold gbr-green text-uppercase mb-1">
                                  {product.name}es
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                  {product.quantity}
                                </div>
                              </div>
                            );
                          }
                        })
                      } */}
                      <div className="col-auto">
                        <i className="fa fa-th fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Tasks Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Number of Products Above Upper Limits
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {/* {above_limits} */}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fab fa-stack-overflow fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Pending Requests Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          Number of Products Below Lower Limits
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {/* {below_limits} */}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        <a className="nav-link active" href="#pills-profile" data-toggle="tab" role="tab">Jobs</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#pills-profile" data-toggle="tab" role="tab">Inspections</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#pills-profile" data-toggle="tab" role="tab">Sections</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#pills-profile" data-toggle="tab" role="tab">Section Requirements</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#pills-profile" data-toggle="tab" role="tab">Sub Sections</a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a className="nav-link" href="#pills-status" data-toggle="tab" role="tab">Status</a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="table-responsive">
                            {/* Below should be this.props.item.loading */}
                          {false ? (
                            <Spinner />
                          ) : (
                            <div className="table-responsive">
                              <Table columns={columns} data={jobs} />
                            </div>
                          )}
                        </div>  
                      </div>
                      <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">2</div>
                      <div className="tab-pane fade" id="pills-status" role="tabpanel" aria-labelledby="pills-status-tab">
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
  jobs: state.jobs,
  status: state.status,
});

export default connect(mapStateToProps, { getJobs, getStatuses, getSubSections })(Admin);
