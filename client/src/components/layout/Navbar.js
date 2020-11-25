import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li className="nav-links">
        <Link to="/profiles"><i className="fa fa-leaf" style={{marginRight: "7px"}} />DEVELOPERS</Link>
      </li>
      <li className="nav-links">
        <Link to="/posts"><i className="fa fa-comments" style={{marginRight: "7px"}} />POSTS</Link>
      </li>
      <li className="nav-links">
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">DASHBOARD</span>
        </Link>
      </li>
      <li className="nav-links">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">LOGOUT</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className="nav-links">
        <Link to="/profiles"><i className="fa fa-leaf" style={{marginRight: "7px"}} />DEVELOPERS</Link>
      </li>
      <li className="nav-links">
        <Link to="/register">REGISTER</Link>
      </li>
      <li className="nav-links">
        <Link to="/login">LOGIN</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevIn
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
