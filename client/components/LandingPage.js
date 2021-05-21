import React from "react";
import { connect } from "react-redux";

class LandingPage extends React.Component {
  render() {
    const { loading } = this.props;
    if (loading) return <span style={{ placeSelf: "center" }}>Loading</span>;
    return (
      <div id="landing-page">
        <h1>Priceless</h1>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(LandingPage);
