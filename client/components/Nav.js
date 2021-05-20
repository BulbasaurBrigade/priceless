import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Nav = ({ handleClick, isLoggedIn }) => (
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
            <a>Posts</a>
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
            <Link to="/chat">Chat</Link>
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
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    ) : (
      <nav className="menu-content">
        {/* The navbar will show these links before you log in */}
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    )}
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
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
