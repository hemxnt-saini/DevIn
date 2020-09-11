import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fa fa-user-circle' /> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fa fa-black-tie' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fa fa-graduation-cap' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
