import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfoForm from "../UserAuth/UserInfoForm";

class EditProfile extends React.Component {
  render() {
    return (
      <div className="form-container">
        <h2>Edit your profile</h2>
        <UserInfoForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
