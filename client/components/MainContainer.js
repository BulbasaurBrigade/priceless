import React from "react";
import { connect } from "react-redux";
import MapNavbar from "./MapNavbar";
import MapView from "./MapView";
import ListView from "./ListView";
import { setPosts } from "../store/posts";

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <div>
        <MapNavbar />
        <div id="main-container-bottom">
          <MapView />
          <ListView />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
  };
};

export default connect(null, mapDispatchToProps)(MainContainer);
