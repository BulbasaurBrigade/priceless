import React from "react";
import { setPosts, setFilteredPosts } from "../store/posts";
import { connect } from "react-redux";

class MapNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ category: event.target.value });
    if (event.target.value === "all") {
      this.props.getPosts();
    } else {
      this.props.getFilteredPosts(event.target.value);
    }
  }

  render() {
    return (
      <div id="map-navbar">
        <div className="select">
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="all">All</option>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
    getFilteredPosts: (category) => dispatch(setFilteredPosts(category)),
  };
};
export default connect(null, mapDispatchToProps)(MapNavBar);
