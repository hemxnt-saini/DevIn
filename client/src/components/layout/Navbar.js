import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles' className='nav-head'>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/posts' className='nav-head'>
          Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fa fa-user' />{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fa fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles' className='nav-head'>
          Developers
        </Link>
      </li>
      <li>
        <Link to='/register' className='nav-head'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' className='nav-head'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-d-dark'>
      <h1>
        <Link to='/' className='nav-head-1'>
          <i className='fa fa-code' /> DevIn
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
