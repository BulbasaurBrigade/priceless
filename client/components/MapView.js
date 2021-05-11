import React from "react";
import Marker from "./Marker";
import MapPopUp from "./MapPopUp";

class MapView extends React.Component {
  render() {
    return (
      <div>
        <Marker />
        <MapPopUp />
      </div>
    );
  }
}

export default MapView;
