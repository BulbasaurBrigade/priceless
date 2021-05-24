import React from 'react';
import { setPosts, setFilteredPosts, setSearchedPosts } from '../store/posts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { _setSearch } from '../store/postFilters';

class MapNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ category: event.target.value });
    this.props.getFilteredPosts(event.target.value);
  }

  handleType = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = (evt) => {
    evt.preventDefault();
    this.props.getSearchedPosts(this.state.search);
  };

  handleClear = () => {
    this.setState({ search: '' });
    this.props.getSearchedPosts('');
  };

  render() {
    return (
      <div id="map-navbar">
        <div className="filters">
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="">All</option>
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
            <option value="other">Other</option>
          </select>
          <form
            onSubmit={this.handleSearch}
            onReset={this.handleClear}
            className="searchBar"
          >
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={this.handleType}
              placeholder="Search..."
            />
            <button type="reset">X</button>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <Link to="/add">Create a Post</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
    getFilteredPosts: (category) => dispatch(setFilteredPosts(category)),
    getSearchedPosts: (search) => dispatch(setSearchedPosts(search)),
    clearSearchFilter: () => dispatch(_setSearch('')),
  };
};
export default connect(null, mapDispatchToProps)(MapNavBar);
