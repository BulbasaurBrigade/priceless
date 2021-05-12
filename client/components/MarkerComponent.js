import React from "react";
import MapPopUp from "./MapPopUp";
import { Marker } from "react-leaflet";
import { connect } from "react-redux";
import { setSinglePost } from "../store/singlePost";
//import L from 'leaflet'

// const defaultIcon = new L.Icon({
//   //iconUrl: require("../static/icon.png"),
//   iconSize: [35, 46],
//   iconAnchor: [17, 46]
// })

class MarkerComponent extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.getSinglePost(id);
  }

  render() {
    const lat = this.props.post.latitude;
    const long = this.props.post.longitude;
    const post = this.props.post;
    return (
      <div onClick={() => this.handleClick(post.id)}>
        <Marker
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
