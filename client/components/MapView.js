import React from "react";
import Marker from "./Marker";
import MapPopUp from "./MapPopUp";

class MapView extends React.Component {
  render() {
    return (
      <div id="map-view">
        <p>Map Goes Here</p>
        <Marker />
        <MapPopUp />
      </div>
    );
  }
}

export default MapView;
