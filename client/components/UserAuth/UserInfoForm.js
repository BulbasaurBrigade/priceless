import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfoMap from "./UserInfoMap";
import { getGeocode } from "../../store/location";
import { userImagesRef, storage } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      location: "",
      imageToUpload: {},
      imageURL: "",
      lat: null,
      lng: null,
      previewMap: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
  }

  //When a user is editing their profile, the form will get populated with their current information
  //The form areas are broken up because a user may not have a location
  componentDidMount() {
    if (this.props.displayName) {
      const { displayName } = this.props;
      this.setState({ displayName });
    }
    if (this.props.userLat) {
      const { userLat, userLng } = this.props;
      this.setState({ lat: userLat, lng: userLng });
    }
    if (this.props.location) {
      const { location } = this.props;
      this.setState({ location });
    }
    if (this.props.imageURL) {
      const { imageURL } = this.props;
      this.setState({ imageURL });
    }
  }

  //When a user clicks the 'preview location', a call is made to the google geocode api to get the coords
  handlePreviewLocation = async (address) => {
    const { previewGeocode } = this.props;
    await previewGeocode(address);
    this.setState({ lat: this.props.newLat, lng: this.props.newLng });
  };

  //As a user types, state changes
  handleChange = (event) => {
    if (event.target.name === "imageToUpload" && event.target.files[0]) {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  //A user's information is updated in the database
  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { submit, userId } = this.props;
    const file = this.state.imageToUpload;
    const newFileName = file.name + `user${this.state.displayName}${userId}`;
    const imageRef = ref(userImagesRef, newFileName);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(ref(storage, `userImages/${newFileName}`));
    this.setState({ imageURL: url });
    submit({ ...this.state, id: userId });
  };

  handleDeletePhoto(event) {
    event.preventDefault();
    this.setState({ imageToUpload: {} });
  }

  render() {
    const { displayName, location, imageURL, previewMap, imageToUpload } =
      this.state;

    let userLocation;
    if (this.state.lat) {
      userLocation = [this.state.lat, this.state.lng];
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="displayName">
            Display Name <span style={{ color: "red" }}>*</span>
          </label>
          <p className="form-instructions">
            Your display name is what will be visible to your Priceless
            Neighbors when you list an item or use the chat.
          </p>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="location">
            Address or Search Location <span style={{ color: "red" }}>*</span>
          </label>
          <p className="form-instructions">
            The location you enter here will be the center of your personal
            neighborhood map. This location will NOT be visible to anyone. You
            may choose to use a specific address, cross streets, a neighborhood,
            or a zip code. And you can preview where the center of your map will
            be using the 'Preview Location' button below.
          </p>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={this.handleChange}
            required
          />
          <button
            className="preview-button"
            type="button"
            onClick={() => this.handlePreviewLocation(location)}
          >
            Preview Location
          </button>
          {previewMap ? <UserInfoMap userLocation={userLocation} /> : ""}
          <label htmlFor="imageURL">Profile Photo</label>
          <input
            type="file"
            name="imageToUpload"
            onChange={this.handleChange}
            id="image_upload"
          ></input>
          {imageToUpload.name && (
            <div>
              <p>Preview Of New Photo</p>
              <div className="photo-preview-div">
                <img
                  src={URL.createObjectURL(imageToUpload)}
                  height={200}
                  className="photo-preview"
                />
                <button
                  className="delete-photo"
                  onClick={this.handleDeletePhoto}
                >
                  x
                </button>
              </div>
            </div>
          )}
          {imageURL && (
            <div>
              <p>Current Photo</p>
              <div className="photo-preview-div">
                <img src={imageURL} height={200} className="photo-preview" />
                <button
                  className="delete-photo"
                  onClick={this.handleRemovePhoto}
                >
                  x
                </button>
              </div>
            </div>
          )}
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    newLat: state.location.lat,
    newLng: state.location.lng,
    displayName: state.auth.displayName,
    location: state.auth.location,
    userLat: state.auth.latitude,
    userLng: state.auth.longitude,
    imageURL: state.auth.imageURL,
  };
};

const mapDispatch = (dispatch) => ({
  previewGeocode: (location) => dispatch(getGeocode(location)),
});

export default connect(mapState, mapDispatch)(UserInfoForm);
