import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large main-head'>DevIn</h1>
          <p className='lead main-para'>
            Create your developer profile, share posts and get help from
            other developers.
          </p>
          <div className='buttons main-buttons'>
            <Link to='/register' className='btn btn-primary curvy'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light curvy'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
