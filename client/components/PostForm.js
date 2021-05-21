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
import PostFormMap from './PostFormMap';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';

const initialState = {
  title: '',
  description: '',
  category: 'other',
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
          location,
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

  handlePreviewLocation = async (location) => {
    const { prevGeocode } = this.props;
    prevGeocode(location);
  };

  render() {
    const { post, error, loading } = this.props;
    const title = this.state.title || '';
    const description = this.state.description || '';
    const category = this.state.category || '';
    const latitude = this.state.latitude || null;
    const longitude = this.state.longitude || null;
    const images = this.state.images || [];
    const pickupDetails = this.state.pickupDetails || '';
    const location = this.state.location || '';
    let userLocation;
    if (latitude) {
      userLocation = [latitude, longitude];
    }
    console.log(userLocation);

    if (loading) {
      console.log('we are rendering something new in post form');
      return <LoadingPage />;
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {error ? <span>{error}</span> : ''}
          <div>
            <label>
              Post Title <span style={{ color: 'red' }}>*</span>
            </label>
            <input name="title" value={title} onChange={this.handleChange} />
            <label>Description </label>
            <p className="form-instructions">
              You are encouraged to include as many relevant details as you can
              to help your neighbors know whether they should request your item.
              Some suggestions include: size, dimensions, and any noticeable
              wear/tear.
            </p>
            <input
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <label>Pickup Details</label>
            <p className="form-instructions">
              What days/times are you generally available for the handoff? Do
              you have a specific time at which you would ideally like to meet?
              Include it here!
            </p>
            <input
              id="pickup details"
              name="pickupDetails"
              value={pickupDetails}
              onChange={this.handleChange}
            />
            <label>
              Location <span style={{ color: 'red' }}>*</span>
            </label>

            <p className="form-instructions">
              Include an address, intersection, neighborhood, or zip code in
              which you'd like to do your handoff. You can use the "Preview
              Marker" button below to see where your item's marker will be on
              the map! <br />
              PLEASE NOTE: The location you list here will be visible to all
              Priceless users, so it's best to list a location that is not your
              home address.
            </p>
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
              Preview Location
            </button>

            <PostFormMap userLocation={userLocation} />
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
              <option value="other">Other</option>
            </select>
            <label>
              Add Photos <span style={{ color: 'red' }}>*</span>
            </label>
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
          <button
            type="submit"
            className="submit"
            disabled={!title || !location || !images.length}
          >
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
  error: state.error,
  loading: state.loading.submit,
});

const mapDispatch = (dispatch) => ({
  prevGeocode: (location) => dispatch(getGeocode(location)),
});

export default connect(mapState, mapDispatch)(PostForm);
