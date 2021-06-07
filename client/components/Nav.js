import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Nav = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="dropdown">
    {isLoggedIn ? (
      <nav>
        {/* The navbar will show these links after you log in */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to="/posts">Posts</Link>
            <ul>
              <li>
                <Link to="/posts">View Posts</Link>
              </li>
              <li>
                <Link to="/add">Create Post</Link>
              </li>
            </ul>
          </li>
          <li>
            <a>My Account</a>
            <ul>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/myposts">My Posts</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/chat">
              <i className="fa fa-comments" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </nav>
    ) : (
      <nav className="menu-content">
        {/* The navbar will show these links before you log in */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/posts">Posts</Link>
            <ul>
              <li>
                <Link to="/posts">View Posts</Link>
              </li>
              <li>
                <Link to="/add">Create Post</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <a>Sign In</a>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    )}
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
