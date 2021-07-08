import React from "react";

const Notification = ({ description, date, user }) => {
  return (
    <div>
      <button className="dropdown-item d-flex align-items-center" href="#">
        <div className="mr-3">
          <div className="icon-circle bg-warning">
            <i className="fas fa-exclamation-triangle text-white"></i>
          </div>
        </div>
        <div>
          <div className="small gbr-green">
            {date}
            {date.toLocaleDateString}
          </div>
          {user.first_name} {user.last_name}: {description}
        </div>
      </button>
    </div>
  );
};

export default Notification;
