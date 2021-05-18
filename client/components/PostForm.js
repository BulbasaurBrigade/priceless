import React from "react";
import { postImagesRef, storage } from "../firebase";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const initialState = {
  title: "",
  description: "",
  category: "",
  latitude: 0,
  longitude: 0,
  images: [],
  pickupDetails: "",
  imageRefs: [],
  imageUrls: [],
  isLoading: false,
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post) {
      if (this.props.post !== prevProps.post) {
        this.setState({ ...this.props.post });
      }
    }
  }

  handleChange(event) {
    if (event.target.name === "latitude" || event.target.name === "longitude") {
      this.setState({ [event.target.name]: +event.target.value });
    } else if (event.target.name === "images") {
      const newImagesArray = [...this.state.images, event.target.files[0]];
      this.setState({ [event.target.name]: newImagesArray });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    //in case we want to add a loading message, setState to isLoading
    this.setState({ isLoading: true });
    const { userId, submit, type } = this.props;

    //iterate over images in this.state.images
    for (let i = 0; i < this.state.images.length; i++) {
      //grab a file
      const file = this.state.images[i];
      //create a unique file name to prevent it from being overwritten in cloud
      const newFileName =
        file.name + `user${userId}post${this.state.title}image${i}`;
      //create imageRef in the cloud - this is where it will be saved
      const imageRef = ref(postImagesRef, newFileName);
      //upload the file to the imageRef
      await uploadBytes(imageRef, file);
      //add the imageRef to this.state.imageRefs
      this.setState({ imageRefs: [...this.state.imageRefs, imageRef] });
      //generate url for this image
      const url = await getDownloadURL(
        ref(storage, `postImages/${newFileName}`)
      );
      //add this url to this.state.imageUrls
      this.setState({ imageUrls: [...this.state.imageUrls, url] });
    }

    this.setState({ isLoading: false });
    //deconstruct necessary items from state
    const {
      title,
      description,
      category,
      latitude,
      longitude,
      imageUrls,
      imageRefs,
      pickupDetails,
    } = this.state;

    //pass necessary items from state to either updatePost or addPost (which is passed from wrapper components)
    if (type === "create") {
      submit(
        {
          title,
          description,
          category,
          latitude,
          longitude,
          imageUrls,
          imageRefs,
          pickupDetails,
        },
        userId
      );
    } else if (type === "edit") {
      submit({ ...this.state });
    }
  };

  handleDeletePhoto(event) {
    event.preventDefault();
    const imageToDelete = event.target.value;
    const newimagesArray = [...this.state.images].filter(
      (file) => file.name !== imageToDelete
    );
    this.setState({ images: [...newimagesArray] });
  }

  render() {
    const { post } = this.props;
    const title = this.state.title || "";
    const description = this.state.description || "";
    const category = this.state.category || "";
    const latitude = this.state.latitude || 0;
    const longitude = this.state.longitude || 0;
    const images = this.state.images || [];
    const pickupDetails = this.state.pickupDetails || "";
    console.log("this.state", this.state);

    return (
      <div className="form-container">
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
            <label>Pickup Details</label>
            <input
              id="pickup details"
              name="pickupDetails"
              value={pickupDetails}
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
                <button onClick={this.handleDeletePhoto} value={file.name}>
                  x
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
