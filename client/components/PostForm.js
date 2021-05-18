import React from 'react';
import { postImagesRef, storage } from '../firebase';
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import axios from 'axios';
import { getGeocode } from '../store/location';
import { connect } from 'react-redux';

const initialState = {
  title: '',
  description: '',
  category: '',
  latitude: null,
  longitude: null,
  images: [],
  pickupDetails: '',
  imageRefs: [],
  imageUrls: [],
  isLoading: false,
  location: '',
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
    if (this.props.latitude !== prevProps.latitude) {
      this.setState({
        latitude: this.props.latitude,
        longitude: this.props.longitude,
      });
    }
  }

  handleChange(event) {
    if (event.target.name === 'latitude' || event.target.name === 'longitude') {
      this.setState({ [event.target.name]: +event.target.value });
    } else if (event.target.name === 'images') {
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
      location,
    } = this.state;

    //pass necessary items from state to either updatePost or addPost (which is passed from wrapper components)
    if (type === 'create') {
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
        userId,
        location
      );
    } else if (type === 'edit') {
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

  handlePreviewLocation = async (address) => {
    const { prevGeocode } = this.props;
    prevGeocode(address);
  };

  render() {
    const { post } = this.props;
    const title = this.state.title || '';
    const description = this.state.description || '';
    const category = this.state.category || '';
    const latitude = this.state.latitude || null;
    const longitude = this.state.longitude || null;
    const images = this.state.images || [];
    const pickupDetails = this.state.pickupDetails || '';
    const location = this.state.location || '';
    console.log('this.state', this.state);

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
            {/* <label>Latitude</label>
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
            /> */}
            <label>Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={() => this.handlePreviewLocation(location)}
            >
              Preview Marker Location
            </button>
            {latitude === null ? (
              ''
            ) : (
              <>
                <br />
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
              </>
            )}
            <label>Category</label>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                {''}
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

const mapState = (state) => ({
  latitude: state.location.lat,
  longitude: state.location.lng,
});

const mapDispatch = (dispatch) => ({
  prevGeocode: (location) => dispatch(getGeocode(location)),
});

export default connect(mapState, mapDispatch)(PostForm);
