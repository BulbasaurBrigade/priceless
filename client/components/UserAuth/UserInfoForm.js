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

  handlePreviewLocation = async (address) => {
    const { prevGeocode } = this.props;
    prevGeocode(address);
    this.setState({ lat: this.props.lat, lng: this.props.lng });
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

    let userLocation;
    if (this.state.lat) {
      userLocation = [this.state.lat, this.state.lng];
    }
    console.log(this.state, "render");

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
          />
          <button
            type="button"
            onClick={() => this.handlePreviewLocation(location)}
          >
            show Location
          </button>
          {this.state.lat === null ? (
            <p>got nothing</p>
          ) : (
            <>
              <br />
              <p>Latitude: {this.state.lat}</p>
              <p>Longitude: {this.state.lng}</p>
            </>
          )}
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
    lat: state.location.lat,
    lng: state.location.lng,
  };
};

const mapDispatch = (dispatch) => ({
  prevGeocode: (location) => dispatch(getGeocode(location)),
});

export default connect(mapState, mapDispatch)(UserInfoForm);
