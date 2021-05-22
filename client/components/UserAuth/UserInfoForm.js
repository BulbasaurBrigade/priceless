import React, { Component } from "react";
import { connect } from "react-redux";
import UserInfoMap from "./UserInfoMap";
import { getGeocode } from "../../store/location";

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      location: "",
      imageURL: "",
      lat: null,
      lng: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
  }

  handlePreviewLocation = async (address) => {
    const { prevGeocode } = this.props;
    await prevGeocode(address);
    this.setState({ lat: this.props.newLat, lng: this.props.newLng });
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { submit, userId } = this.props;
    submit({ ...this.state, id: userId });
  };

  render() {
    const { displayName, location, imageURL } = this.state;
    console.log("THIS.STATE:", this.state);

    let userLocation;
    if (this.state.lat) {
      userLocation = [this.state.lat, this.state.lng];
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="displayName">
            Display Name <span>*</span>
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="location">
            Address or Search Location <span>*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={this.handleChange}
            required
          />
          <button
            type="button"
            onClick={() => this.handlePreviewLocation(location)}
          >
            Preview Location
          </button>
          <UserInfoMap userLocation={userLocation} />
          <label htmlFor="imageURL">Profile Photo</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={imageURL}
            onChange={this.handleChange}
          />
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
  };
};

const mapDispatch = (dispatch) => ({
  prevGeocode: (location) => dispatch(getGeocode(location)),
});

export default connect(mapState, mapDispatch)(UserInfoForm);
