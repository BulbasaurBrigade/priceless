import React from "react";
import { connect } from "react-redux";
import MapNavbar from "./MapNavbar";
import MapView from "./MapView";
import ListView from "./ListView";
import { setPosts } from "../store/posts";

class MainContainer extends React.Component {
  componentDidMount() {
    // this.props.getPosts();
  }
  render() {
    let userLocation;
    if (this.props.userLat) {
      userLocation = [this.props.userLat, this.props.userLng];
    }
    return (
      <div>
        <MapNavbar />
        <div id="main-container-bottom">
          <MapView userLocation={userLocation} />
          <ListView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLat: state.auth.latitude,
    userLng: state.auth.longitude,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
