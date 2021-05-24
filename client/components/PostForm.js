import React from "react";
import { postImagesRef, storage } from "../firebase";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import { getGeocode } from "../store/location";
import PostFormMap from "./PostFormMap";
import { connect } from "react-redux";
import EditImageForm from "./myAccount/EditImageForm";
import LoadingPage from "./LoadingPage";
import { _clearErrors } from "../store/error";

const initialState = {
  title: "",
  description: "",
  category: "other",
  latitude: null,
  longitude: null,
  imagesToUpload: [],
  imageUrls: [],
  postImages: [],
  pickupDetails: "",
  isLoading: false,
  location: "",
  previewMap: false,
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
    this.preventSubmitOnEnter = this.preventSubmitOnEnter.bind(this);
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
    if (event.target.name === "latitude" || event.target.name === "longitude") {
      this.setState({ [event.target.name]: +event.target.value });
    } else if (event.target.name === "imagesToUpload") {
      //if a user clicks cancel, event.target.files[0] is null and we don't want that
      //value added to state
      if (event.target.files[0]) {
        const newImagesArray = [
          ...this.state.imagesToUpload,
          event.target.files[0],
        ];
        this.setState({ [event.target.name]: newImagesArray });
      }

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
    for (let i = 0; i < this.state.imagesToUpload.length; i++) {
      //grab a file
      const file = this.state.imagesToUpload[i];
      //create a unique file name to prevent it from being overwritten in cloud
      const newFileName =
        file.name + `user${userId}post${this.state.title}image${i}`;
      //create imageRef in the cloud - this is where it will be saved
      const imageRef = ref(postImagesRef, newFileName);
      //upload the file to the imageRef
      await uploadBytes(imageRef, file);
      //add the imageRef to this.state.imageRefs
      //this.setState({ imageRefs: [...this.state.imageRefs, imageRef] });
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
      //imageRefs,
      pickupDetails,
      location,
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
          //imageRefs,
          pickupDetails,
          location,
        },
        userId,
        location
      );
    } else if (type === "edit") {
      submit({ ...this.state });
    }
  };
  //delete photos from imagesToUpload in local state
  handleDeletePhoto(event) {
    event.preventDefault();
    const imageToDelete = event.target.value;
    const newimagesArray = [...this.state.imagesToUpload].filter(
      (file) => file.name !== imageToDelete
    );
    this.setState({ imagesToUpload: [...newimagesArray] });
  }

  handlePreviewLocation = async (location) => {
    const { prevGeocode } = this.props;
    prevGeocode(location);
    this.setState({ previewMap: true });
  };

  preventSubmitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    const { post, postError, previewError, loading } = this.props;
    const title = this.state.title || "";
    const description = this.state.description || "";
    const category = this.state.category || "";
    const latitude = this.state.latitude || null;
    const longitude = this.state.longitude || null;
    const imagesToUpload = this.state.imagesToUpload || [];
    const postImages = this.state.postImages || [];
    const pickupDetails = this.state.pickupDetails || "";
    const location = this.state.location || "";
    let userLocation;
    if (latitude) {
      userLocation = [latitude, longitude];
    }

    if (loading) {
      return <LoadingPage />;
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {postError ? <span className="error">{postError}</span> : ""}
          <div>
            <label>
              Post Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="title"
              value={title}
              onChange={this.handleChange}
              onKeyPress={this.preventSubmitOnEnter}
              required
            />
            <label>
              Description
              <div className="tooltip-wrap">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                <div className="tooltip-content">
                  <p>
                    You are encouraged to include as many relevant details as
                    you can to help your neighbors know whether they should
                    request your item.
                  </p>
                  <p>
                    Some suggestions include: size, dimensions, and any
                    noticeable wear/tear.
                  </p>
                </div>
              </div>
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <label>
              Pickup details
              <div className="tooltip-wrap">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                <div className="tooltip-content">
                  What days/times are you generally available for the handoff?
                  Do you have a specific time at which you would ideally like to
                  meet? Include it here!
                </div>
              </div>
            </label>
            <input
              id="pickup details"
              name="pickupDetails"
              value={pickupDetails}
              onChange={this.handleChange}
              onKeyPress={this.preventSubmitOnEnter}
            />
            <label>
              Category <div> </div>
            </label>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="other">Other</option>
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
              <option value="spots">Sports</option>
              <option value="tech">Tech</option>
           
            </select>
            <label>
              Location <span style={{ color: "red" }}>*</span>
              <div className="tooltip-wrap">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                <div className="tooltip-content">
                  <p>
                    Include an address, intersection, neighborhood, or zip code
                    in which you'd like to do your handoff.
                  </p>
                  <p>
                    You can use the "Preview Marker" button below to see where
                    your item's marker will be on the map!
                  </p>
                  <p>
                    PLEASE NOTE: The location you list here will be visible to
                    all Priceless users, so it's best to list a location that is
                    not your home address.
                  </p>
                </div>
              </div>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={this.handleChange}
              onKeyPress={this.preventSubmitOnEnter}
              required
            />
            <button
              className="preview-button"
              type="button"
              onClick={() => this.handlePreviewLocation(location)}
            >
              Preview Location
            </button>
            {previewError ? <span className="error">{previewError}</span> : ""}
            {this.state.previewMap ? (
              <PostFormMap userLocation={userLocation} />
            ) : (
              ""
            )}

            <label>
              Add Photos <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="file"
              name="imagesToUpload"
              onChange={this.handleChange}
              id="image_upload"
              required={!this.state.postImages.length}
            ></input>
            {/* when editing a post, render EditImageForm - which allows user to delete photos they already uploaded */}
            {this.state.postImages.length ? (
              <EditImageForm postImages={postImages} postId={post.id} />
            ) : (
              ""
            )}
            {this.state.imagesToUpload.length ? (
              <p>Preview of photos</p>
            ) : (
              <div />
            )}
            {this.state.imagesToUpload.map((file) => {
              if (file) {
                return (
                  <div className="photo-preview-div" key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      height={200}
                      className="photo-preview"
                    />
                    <button
                      className="delete-photo"
                      onClick={this.handleDeletePhoto}
                      value={file.name}
                    >
                      x
                    </button>
                  </div>
                );
              }
            })}
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
  postError: state.error.postForm,
  previewError: state.error.previewLocation,
  loading: state.loading.submit,
});

const mapDispatch = (dispatch) => ({
  prevGeocode: (location) => dispatch(getGeocode(location)),
  clearErrors: () => dispatch(_clearErrors()),
});

export default connect(mapState, mapDispatch)(PostForm);
