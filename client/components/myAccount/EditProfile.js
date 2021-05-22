import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfoForm from "../UserAuth/UserInfoForm";
import { updateUserInfo } from "../../store/auth";

class EditProfile extends React.Component {
  render() {
    const { updateProfile } = this.props;
    return (
      <div className="form-container">
        <h2>Edit your profile</h2>
        <UserInfoForm submit={updateProfile} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user) => dispatch(updateUserInfo(user)),
  };
};

export default connect(null, mapDispatchToProps)(EditProfile);
