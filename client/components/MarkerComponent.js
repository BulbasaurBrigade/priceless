import React from "react";
import MapPopUp from "./MapPopUp";
import { Marker } from 'react-leaflet'
import { connect } from 
//import L from 'leaflet' 


// const defaultIcon = new L.Icon({
//   //iconUrl: require("../static/icon.png"),
//   iconSize: [35, 46],
//   iconAnchor: [17, 46]
// })

class MarkerComponent extends React.Component {
  render() {
    const lat = this.props.post.latitude 
    const long = this.props.post.longitude
    return <div>
      <Marker position={[lat, long]}/>
      <MapPopUp />
    </div>
  }
}

export default MarkerComponent;
