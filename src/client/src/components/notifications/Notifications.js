import React from "react";
import { connect } from "react-redux";

import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";

class Notifications extends React.Component {
  render() {
    const { notifications } = this.props.notifications;

    var crumbs = [
      {
        title: "Dashboard",
        link: "/",
      },
      {
        title: "Notifications",
      },
    ];

    var columns = [
      {
        Header: "Created By",
        accessor: "created_by",
        width: 100,
        Cell: (e) => {
          if(!e.value.suffix) {
            return e.value.first_name + " " + e.value.last_name;
          } else {
            return e.value.first_name + " " + e.value.last_name + " " + e.value.suffix;
          }
        }
      },
      {
        Header: "Notification",
        accessor: "description",
        width: 100,
      },
      {
        Header: "Date",
        accessor: "date",
        width: 50,
        Cell: (e) => {
          let date = new Date(e.value);

          return date.toLocaleString("en-US");
        },
      },
      {
        Header: "Status",
        accessor: "read",
        width: 150,
        Cell: (e) => {
          if (e.value === true) {
            return "Read";
          } else {
            return "Unread";
          }
        },
      },
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
                      Notifications
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    {this.props.notifications.loading ? (
                      <Spinner />
                    ) : (
                      <Table columns={columns} data={notifications} />
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
  notifications: state.notifications,
});

export default connect(mapStateToProps, {})(Notifications);
