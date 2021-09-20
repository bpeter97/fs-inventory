import React from "react";
import { connect } from "react-redux";

import Breadcrumb from "../common/Breadcrumb";
import CreateUserForm from "./CreateUserForm";

class CreateUser extends React.Component {
  render() {

    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Users",
        link: "/users"
      },
      {
        title: "Create User"
      }
    ];

    return (
      <div>
        <div className="container-fluid">
          <div className="col-12">
            <Breadcrumb crumbs={crumbs} />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                {/* <!-- DataTales Example --> */}
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold gbr-green text-center">
                      Create User
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <CreateUserForm history={this.props.history} />
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
});

export default connect(mapStateToProps, {})(CreateUser);
