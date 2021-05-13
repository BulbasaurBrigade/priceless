import React from "react";
import { connect } from "react-redux";
import { createPost } from "../store/posts";

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      category: "",
      latitude: "",
      longitude: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "latitude" || event.target.name === "longitude") {
      this.setState({ [event.target.name]: +event.target.value });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPost({ ...this.state });
  }
  render() {
    const { title, description, category, latitude, longitude } = this.state;

    console.log("state", this.state);

    return (
      <div className="form-container">
        <h2>please fill out the form to create a new post</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Post Title `<span>*</span>
            </label>
            <input name="title" value={title} onChange={this.handleChange} />

            <label>Description</label>
            <input
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />

            <label>Latitude</label>
            <input
              name="latitude"
              type="number"
              value={latitude}
              onChange={this.handleChange}
            />
            <label>Longitude</label>
            <input
              name="longitude"
              type="number"
              value={longitude}
              onChange={this.handleChange}
            />

            <label>Category</label>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                {""}
              </option>
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
          <button type="submit" className="submit">
            Create
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addPost: (post) => dispatch(createPost(post, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePost);
