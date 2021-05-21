import React from "react";
import { connect } from "react-redux";

export default class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <h1>Priceless</h1>
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </div>
    );
  }
}
