import React from "react";
import { connect } from "react-redux";

import "./NewCall.css";

import Breadcrumb from "../common/Breadcrumb";
import CreateCallForm from "../call/CreateCallForm";

class Admin extends React.Component {
  constructor(props) {
    super(props);
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
});

export default connect(mapStateToProps, {})(Admin);
