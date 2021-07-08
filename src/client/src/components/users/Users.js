import React from "react";
import { connect } from "react-redux";

import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";

import { getUsers, activateUser } from "./../../redux/actions/userActions";

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  activateUser = (id) => {
    this.props.activateUser({
      _id: id
    });
    setTimeout(() => {
      this.props.getUsers();
    }, 1000);
  }

  render() {
    const { users } = this.props.users;

    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Users",
      },
    ];

    var columns = [
      {
        Header: "First Name",
        accessor: "first_name",
        width: 50,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        width: 50,
      },
      {
        Header: "Suffix",
        accessor: "suffix",
        width: 50
      },
      {
        Header: "Username",
        accessor: "username",
        width: 50
      },
      {
        Header: "Email",
        accessor: "email",
        width: 50
      },
      {
        Header: "Position",
        accessor: "position",
        width: 50,
      },
      {
        Header: "Activated?",
        accessor: "approved",
        width: 50,
        Cell: e => {
          if(e.value) {
            return "Yes";
          } else {
            return "No";
          }
        }
      },
      {
        Header: "Actions",
        id: "view",
        accessor: "_id",
        width: 50,
        Cell: (e) => {
          let buttons = [];

          let user = users.find(user => {
            return e.value === user._id
          })

          if(!user.approved) {
            buttons.push((
            <button
              key={Math.random(10)}
              className="btn btn-success btn-sm"
              value={e.value}
              onClick={(x) => {
                x.preventDefault();
                this.activateUser(e.value);
              }}
              data-toggle="modal"
              data-target={'#modal_' + e.value}
              >
              <i className="fas fa-thumbs-up"></i>
            </button>
            ));
          }

          return buttons.map(button => button);
        }
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
                      Users
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    {this.props.users.loading ? (
                      <Spinner />
                    ) : (
                      <div className="table-responsive">
                      <Table columns={columns} data={users} />
                      </div>
                    )}
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
  users: state.users,
});

export default connect(mapStateToProps, { getUsers, activateUser })(Users);
