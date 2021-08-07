import React from "react";
import { connect } from "react-redux";
import {Button, Modal} from 'react-bootstrap';

import "./Home.css";

import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";
import Alert from "./../common/Alert";

import { getJobs } from "./../../redux/actions/jobsActions";
import { getCalls } from "./../../redux/actions/callActions";
import CreateCallForm from "../call/CreateCallForm";

function toCurrency(num) {
  let number = num;
  return number.$numberDecimal.toLocaleString('USD');
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createCallModal: false
    }
  }

  componentDidMount() {
    this.props.getJobs();
    this.props.getCalls();
  }

  handleNewCallModal() {
    this.setState({ createCallModal: !this.state.createCallModal });
  }

  render() {
    Date.prototype.formatMMDDYYYY = function(){
      return (this.getMonth() + 1) + 
      "/" +  this.getDate() +
      "/" +  this.getFullYear();
    }

    const { jobs } = this.props.jobs;
    const { calls } = this.props.calls;

    var crumbs = [
      {
        title: "Dashboard",
      },
    ];

    var callColumns = [
      {
        Header: "Date",
        accessor: "date",
        width: 20,
        Cell: prop => {
          let date = new Date(prop.value);
          return date.formatMMDDYYYY();
        }
      },
      {
        Header: "F/U Date",
        accessor: "follow_up",
        width: 20,
        Cell: prop => {
          let date = new Date(prop.value);
          return date.formatMMDDYYYY();
        }
      },
      {
        Header: "Client Name",
        accessor: "client_name",
        width: 150,
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
        width: 150,
      },
      {
        Header: "Address",
        accessor: "full_address",
        minWidth: 250,
      },
      {
        Header: "SQ FT",
        accessor: "square_foot",
        width: 20,
      },
      {
        Header: "Res Ins",
        accessor: "home_inspection",
        width: 20,
        Cell: props => {
          if(props.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Crawl",
        accessor: "crawl",
        width: 20,
        Cell: props => {
          if(props.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Multi",
        accessor: "multi_story",
        width: 20,
        Cell: props => {
          if(props.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Pool/Spa",
        accessor: "pool_spa",
        width: 20,
        Cell: props => {
          if(props.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Deck",
        accessor: "deck",
        width: 20,
        Cell: props => {
          if(props.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Quote",
        accessor: "quote",
        Cell: props => <div> {toCurrency(props.value)} </div>,
        width: 100,
      },
    ];

    let total_products = 0;
    let above_limits = 0;
    let below_limits = 0;
    let alerts = [];

    var total_calls = calls.length;
    var total_jobs = jobs.length;

    // products.forEach((product) => {
    //   total_products += product.quantity;

    //   if (product.quantity > product.upper_limit) {
    //     above_limits++;

    //     let m = product.name;
    //     m += " is over the upper limit by ";
    //     m += product.quantity - product.upper_limit;
    //     m += ".";

    //     alerts.push(<Alert type="warning" key={Math.random(10)} message={m} />);
    //   } else if (product.quantity < product.lower_limit) {
    //     below_limits++;

    //     let m = product.name;
    //     m += " is under the below limit by ";
    //     m += product.lower_limit - product.quantity;
    //     m += ".";

    //     alerts.push(<Alert type="danger" key={Math.random(10)} message={m} />);
    //   }
    // });
    let products = [
      {
        name: "car",
        quantity: 1
      }
    ]
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

              {/* <!-- Tasks Card Example --> */}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-purple shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                          Calls This Month
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {total_calls}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-phone fa-2x text-gray-300"></i>
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
                          {above_limits}
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
                          {below_limits}
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
                      Call Log
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <div className="mb-3 text-left">
                      <Button variant="primary" onClick={() => this.handleNewCallModal()}>
                        New Call
                      </Button>
                    </div>
                    
                    <Modal show={this.state.createCallModal} dialogClassName="modal-lg">
                          <Modal.Header closeButton onClick={() => this.handleNewCallModal()}>
                            <Modal.Title>New Call</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CreateCallForm history={this.props.history} />
                          </Modal.Body>
                        </Modal>

                    <div className="table-responsive">
                      {/* Below should be this.props.item.loading */}
                      {false ? (
                        <Spinner />
                      ) : (
                        <div className="table-responsive">
                          <Table columns={callColumns} data={calls} />
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
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  calls: state.calls,
});

export default connect(mapStateToProps, { getJobs, getCalls })(Home);
