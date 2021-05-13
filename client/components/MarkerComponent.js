import React from "react";
import MapPopUp from "./MapPopUp";
import { Marker } from "react-leaflet";
import { connect } from "react-redux";
import { setSinglePost } from "../store/singlePost";
import L from 'leaflet'

// const defaultIcon = new L.Icon({
//   //iconUrl: require("../static/icon.png"),
//   iconSize: [35, 46],
//   iconAnchor: [17, 46]
// })

const selectedIcon = new L.icon({
  iconUrl: "https://i.postimg.cc/4N5hZ4Jd/noun-map-pointer-2317847.png",
  iconSize: [27, 40],
  iconAnchor: [20, 40]
})

const unselectedIcon = new L.icon({
  iconUrl: "https://i.postimg.cc/ryBFQZr9/noun-map-pointer-3859353.png",
  iconSize: [27, 40],
  iconAnchor: [20, 40]
})

class MarkerComponent extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      marker: unselectedIcon
    }
  }

  handleClick(id) {
    if(this.state.marker === unselectedIcon){
      this.setState({marker: selectedIcon})
    }
    else if(this.state.marker === selectedIcon){
      this.setState({marker: unselectedIcon})
    }
    this.props.getSinglePost(id);
  }

  render() {
    const lat = this.props.post.latitude;
    const long = this.props.post.longitude;
    const post = this.props.post;
    return (
      <div onClick={() => this.handleClick(post.id)}>
        <Marker
          icon={this.state.marker}
          position={[lat, long]}
          eventHandlers={{
            click: (e) => {
              this.handleClick(post.id, e);
            },
          }}
        />
        {/* <MapPopUp post={this.props.post} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);
