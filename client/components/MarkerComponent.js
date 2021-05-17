import React from "react";
import MapPopUp from "./MapPopUp";
import { Marker } from "react-leaflet";
import { connect } from "react-redux";
import { setSinglePost } from "../store/singlePost";
import { setMarker } from "../store/map"
import L from 'leaflet'



let selectedIcon = new L.icon({
  iconUrl: "https://i.postimg.cc/4N5hZ4Jd/noun-map-pointer-2317847.png",
  iconSize: [27, 40],
  iconAnchor: [20, 40]
})

let unselectedIcon = new L.icon({
  iconUrl: "https://i.postimg.cc/ryBFQZr9/noun-map-pointer-3859353.png",
  iconSize: [27, 40],
  iconAnchor: [20, 40]
})

let icon = unselectedIcon

class MarkerComponent extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   marker: unselectedIcon
    // }
    // this.handleClick = this.handleClick.bind(this);
    // this.state = {
    //   marker: unselectedIcon
    // }
  }

  handleClick(id) {
    // if(this.state.marker === unselectedIcon){
    //   this.setState({marker: selectedIcon})
      
    // } 
    //  else if (this.state.marker === selectedIcon) {
    //   this.setState({marker: unselectedIcon})
    // }
    this.props.getSinglePost(id);
    this.props.setMarker(id)
    this.marker.icon = selectedIcon
  }

  render() {
    const lat = this.props.post.latitude;
    const long = this.props.post.longitude;
    const post = this.props.post;
    const marker = this.props.marker
    
    return (
      <div onClick={() => this.handleClick(post.id)}>
        <Marker

        icon={icon}
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
    marker: state.marker
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
    setMarker: (id) => dispatch(setMarker(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);
