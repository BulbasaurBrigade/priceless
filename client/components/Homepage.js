import React from "react";
import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import MainContainer from "./MainContainer";

export const Homepage = (props) => {
  return (
    <div id="home-container">
      <section>
        <LandingPage />
      </section>
      <section>
        <MainContainer />
      </section>
    </div>
  );
};

export default Homepage;
