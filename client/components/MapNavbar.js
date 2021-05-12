import React from "react";

class MapNavBar extends React.Component {
  render() {
    return (
      <div id="map-navbar">
        <div className="select">
          <select>
            <option>Filter</option>
            <option value="books">Books</option>
            <option value="children's items">Children's Items</option>
            <option value="clothing">Clothing</option>
            <option value="decor">Decor</option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="furniture">Furniture</option>
            <option value="kitchen">Kitchen</option>

            <option value="personal care">Personal Care</option>
            <option value="pet supplies">Pet Supplies</option>
          </select>
        </div>
      </div>
    );
  }
}

export default MapNavBar;
