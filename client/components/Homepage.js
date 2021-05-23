import React from "react";
import LandingPage from "./LandingPage";
import Footer from "./Footer";

const Homepage = (props) => {
  return (
    <div id="home-container">
      <LandingPage />

      <div id="app-description">
        <div>
          <p>
            Priceless is here to help you connect with your neighbors and share
            resources within your community. Create a post to list anything you
            have that you're ready to give away to someone in your neighborhood!
          </p>

          <p>
            A community focused web application, it connects users with their
            neighbors and helps them take part in a neighborhood gift economy.
          </p>

          <p>
            Priceless was inspired by the popular facebook group, buy nothing.
            We aim to promote mutual aid and neighborhood connections by
            creating a platform where users can post unwanted household items
            and neighbors can browse and request items they want or need.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
