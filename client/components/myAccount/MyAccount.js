import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyPosts from "./MyPosts";

class MyAccount extends React.Component {
  render() {
    return (
      <div id="list-view">
        <Link to="/myposts">My Posts</Link>
      </div>
    );
  }
}

export default MyAccount;
