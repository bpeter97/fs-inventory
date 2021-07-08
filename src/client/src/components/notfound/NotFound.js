import React from "react";
import { connect } from "react-redux";
import "./NotFound.css";

class NotFound extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      document.getElementById("topNav").style.display = "none";
      document.getElementById("accordionSidebar").style.display = "none";
    }
  }

  componentWillUnmount() {
    document.getElementById("topNav").style.display = "block";
    document.getElementById("accordionSidebar").style.display = "block";
  }

  render() {
    return (
      <div id="notfound" className="text-center">
        <img
          className="pt-5 mt-5 img-fluid"
          src="/img/404.png"
          alt="404 Error - Page not found!"
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NotFound);
