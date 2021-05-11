import React from "react";

class MapNavBar extends React.Component {
  render() {
    return (
      <div id="map-navbar">
        <select>
          <option>Filter</option>
          <option>Furniture</option>
          <option>Clothing</option>
          <option>Kitchen</option>
        </select>
      </div>
    );
  }
}

export default MapNavBar;
