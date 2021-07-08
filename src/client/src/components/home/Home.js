import React from "react";
import { connect } from "react-redux";

import "./Home.css";

import Breadcrumb from "./../common/Breadcrumb";
import Spinner from "./../common/Spinner";
import Table from "./../common/Table";
import Alert from "./../common/Alert";

// import { getProducts } from "./../../redux/actions/productActions";

class Home extends React.Component {
  componentDidMount() {
    // this.props.getProducts();
  }

  render() {
    // const { products } = this.props.products;

    var crumbs = [
      {
        title: "Dashboard",
      },
    ];

    var columns = [
      {
        Header: "Product",
        accessor: "name",
        width: 150,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: 150,
      },
      {
        Header: "Measurement",
        accessor: "measurement",
        width: 150,
      },
      {
        Header: "Supplier",
        accessor: "supplier.name",
        width: 150,
      },
      {
        Header: "Account #",
        accessor: "supplier.account_number",
        width: 150,
      },
      {
        Header: "Phone Number",
        accessor: "supplier.phone_number",
        width: 150,
      },
    ];

    let total_products = 0;
    let above_limits = 0;
    let below_limits = 0;
    let alerts = [];

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
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold gbr-green text-uppercase mb-1">
                          Total Products
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {total_products}
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
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      {
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
                      }
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
                    <h4 className="m-0 font-weight-bold gbr-green text-center">
                      Inventory
                    </h4>
                  </div>
                  <div className="card-body text-center">
                    <div class="table-responsive">
                      {/* Below should be this.props.item.loading */}
                    {false ? (
                      <Spinner />
                    ) : (
                      <div className="table-responsive">
                        <Table columns={columns} data={products} />
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
  products: state.products,
});

// export default connect(mapStateToProps, { getProducts })(Home);
export default connect(mapStateToProps, {})(Home);
