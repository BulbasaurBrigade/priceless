import React from "react";
import { connect } from "react-redux";
import { createPost } from "../store/posts";
import {
  postImagesRef,
  uploadBytes,
  ref,
  getDownloadURL,
  storage,
} from "../firebase";

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      category: "",
      latitude: "",
      longitude: "",
      imageToUpload: {},
      images: [],
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "latitude" || event.target.name === "longitude") {
      this.setState({ [event.target.name]: +event.target.value });
    } else if (event.target.name === "imageToUpload") {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleUpload = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const file = this.state.imageToUpload;
    const postImageRef = ref(postImagesRef, file.name);
    await uploadBytes(postImageRef, file);
    const url = await getDownloadURL(ref(storage, `postImages/${file.name}`));
    this.setState({
      images: [...this.state.images, url],
      imageToUpload: {},
      isLoading: false,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPost({ ...this.state });
  }

  render() {
    const { title, description, category, latitude, longitude } = this.state;

    return (
      <div className="form-container">
        <h2>please fill out the form to create a new post</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Post Title <span>*</span>
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
            <label>Add Photos</label>
            <input
              type="file"
              name="imageToUpload"
              onChange={this.handleChange}
              id="image_upload"
            ></input>
            {this.state.imageToUpload.name && (
              <button onClick={this.handleUpload}>Upload Selected File</button>
            )}
            <br />
            {this.state.images.length && <label>Preview of photos</label>}
            {this.state.images.map((imageUrl) => (
              <img src={imageUrl} key={imageUrl} height={200} />
            ))}
          </div>
          <button
            type="submit"
            className="submit"
            disabled={this.state.isLoading}
          >
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
