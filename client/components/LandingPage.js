import React from "react";
import { connect } from "react-redux";

class LandingPage extends React.Component {
  render() {
    const { loading } = this.props;
    if (loading) return <span style={{ placeSelf: "center" }}>Loading</span>;
    return (
      <div id="landing-page">
        <h1>Priceless</h1>
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
