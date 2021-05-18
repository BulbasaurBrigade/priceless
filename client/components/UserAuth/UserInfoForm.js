import React, { Component } from 'react';

export default class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      location: '',
      imageURL: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    const { displayName, location, imageURL } = this.state;
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
