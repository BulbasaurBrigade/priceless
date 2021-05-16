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

const initialState = {
  title: "",
  description: "",
  category: "",
  latitude: "",
  longitude: "",
  images: [],
  isLoading: false,
};

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillUnmount() {
    this.setState(initialState);
  }

  handleChange(event) {
    if (event.target.name === "latitude" || event.target.name === "longitude") {
      this.setState({ [event.target.name]: +event.target.value });
    } else if (event.target.name === "images") {
      console.log(event.target.files[0]);
      const newImagesArray = [...this.state.images, event.target.files[0]];
      this.setState({ [event.target.name]: newImagesArray });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  // handleUpload = async (event) => {
  //   event.preventDefault();
  //   this.setState({ isLoading: true });
  //   const file = this.state.imageToUpload;
  //   const postImageRef = ref(postImagesRef, file.name);
  //   await uploadBytes(postImageRef, file);
  //   const url = await getDownloadURL(ref(storage, `postImages/${file.name}`));
  //   this.setState({
  //     images: [...this.state.images, url],
  //     imageToUpload: {},
  //     isLoading: false,
  //   });
  // };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    console.log("this.state in handleSubmit before photo upload", this.state);

    const file = this.state.images[0];
    await uploadBytes(postImagesRef, file);
    const url = await getDownloadURL(ref(storage, `postImages/${file.name}`));
    // const imageUrlsArray = await Promise.all(
    //   this.state.images.map(async (file) => {
    //     await uploadBytes(postImagesRef, file);
    //     const url = await getDownloadURL(
    //       ref(storage, `postImages/${file.name}`)
    //     );
    //     return url;
    //   })
    // );
    // this.setState({
    //   images: [url],
    //   isLoading: false,
    // });
    console.log(this.state);
    this.props.addPost({ ...this.state });
  };

  handleDelete(event) {
    event.preventDefault();
    const imageToDelete = event.target.value;
    const newimagesArray = [...this.state.images].filter(
      (file) => file.name !== imageToDelete
    );
    this.setState({ images: [...newimagesArray] });
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
              name="images"
              onChange={this.handleChange}
              id="image_upload"
            ></input>
            <br />
            {this.state.images.length ? (
              <label>Preview of photos</label>
            ) : (
              <div />
            )}
            {this.state.images.map((file) => (
              <div className="photo-previw-div" key={file.name}>
                <img
                  src={URL.createObjectURL(file)}
                  height={200}
                  className="photo-preview"
                />
                <button onClick={this.handleDelete} value={file.name}>
                  x
                </button>
              </div>
            ))}
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
