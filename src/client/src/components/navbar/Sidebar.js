import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Sidebar.css";

class Sidebar extends React.Component {

  adminOption = () => {
    return (
    <div>
      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-3" />
      <li className="nav-item">
      <a className="nav-link" href="/admin">
        <i className="fas fa-unlock-alt mr-2"></i>
          Admin
      </a>
      </li>
    </div>
    );
  }

  render() {
    const { user } = this.props.auth;

    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center pt-5 pb-5"
          href="/"
        >
          <img className="sidebar-brand-icon" src="/img/logosmall.png" alt="" />
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item">
          <Link className="nav-link" key={Math.random(10)} to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            Dashboard
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Pages</div>

        {/* <!-- Nav Item --> */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProducts" aria-expanded="true" aria-controls="collapseProducts">
          <i className="fas fa-fw fa-cog"></i>
            <span>Products</span>
          </a>
          <div id="collapseProducts" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Product Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/products">
                View Products
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/products/create">
                Create Product
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOrders" aria-expanded="true" aria-controls="collapseOrders">
            <i className="fa fa-fw fa-download"></i> 
            <span>Deposits</span>
          </a>
          <div id="collapseOrders" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Deposit Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/deposits">
                View Deposits
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/deposits/create">
                Create Deposit
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseWithdrawals" aria-expanded="true" aria-controls="collapseWithdrawals">
            <i className="fa fa-fw fa-upload"></i> 
            <span>Withdrawals</span>
          </a>
          <div id="collapseWithdrawals" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Order Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/withdraws">
                View Withdrawals
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/withdraws/create">
                Create Withdrawal
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSuppliers" aria-expanded="true" aria-controls="collapseSuppliers">
            <i className="fa fa-fw fa-archive"></i> 
            <span>Suppliers</span>
          </a>
          <div id="collapseSuppliers" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Supplier Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/suppliers">
                View Suppliers
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/suppliers/create">
                Create Supplier
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEmployee" aria-expanded="true" aria-controls="collapseEmployee">
            <i className="fa fa-fw fa-users"></i> 
            <span>Employee</span>
          </a>
          <div id="collapseEmployee" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Employee Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/employees">
                View Employees
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/employees/create">
                Create Employee
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="true" aria-controls="collapseUsers">
            <i className="fa fa-fw fa-user"></i> 
            <span>Users</span>
          </a>
          <div id="collapseUsers" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Order Pages</h6>
              <Link className="collapse-item" key={Math.random(10)} to="/users">
                View Users
              </Link>
              <Link className="collapse-item" key={Math.random(10)} to="/users/create">
                Create User
              </Link>
            </div>
          </div>
        </li>
      
        {user.type === 'Admin' ? this.adminOption() : ""}
        
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
