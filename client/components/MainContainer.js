import React from "react";
import MapNavBar from "./MapNavBar";
import MapView from "./MapView";
import ListView from "./ListView";

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <MapNavbar />
        <MapView />
        <ListView />
      </div>
    );
  }
}

export default MainContainer;
