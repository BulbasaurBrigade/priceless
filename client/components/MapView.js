import React from "react";
import MarkerComponent from "./MarkerComponent";
import MapPopUp from "./MapPopUp";

class MapView extends React.Component {
  render() {
    return (
      <div id="map-view">
        <p>Map Goes Here</p>
        <MarkerComponent />
        <MapPopUp />
      </div>
    );
  }
}

export default MapView;
