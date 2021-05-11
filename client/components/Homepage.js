import React from "react";
import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import MainContainer from "./MainContainer";

export const Homepage = (props) => {
  return (
    <div>
      <LandingPage />
      <MainContainer />
    </div>
  );
};

export default Homepage;
