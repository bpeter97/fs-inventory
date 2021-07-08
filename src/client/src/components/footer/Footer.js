import React from "react";
import "./Footer.css";

class Topbar extends React.Component {
  render() {
    return (
      <div id="footer">
        <footer className="sticky-footer bg-white fixed-bottom">
          <div className="container my-auto">
            <div className="copyright text-center my-auto gbr-green">
              <span>
                Copyright &copy; 2021, Victory Drone Services, LLC. All Rights Reserved.
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Topbar;
