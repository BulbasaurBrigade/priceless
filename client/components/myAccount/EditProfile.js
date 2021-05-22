import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfoForm from "../UserAuth/UserInfoForm";
import { updateUserInfo } from "../../store/auth";

class EditProfile extends React.Component {
  render() {
    const { user, updateProfile } = this.props;
    return (
      <div className="form-container">
        <h2>Edit your display name and location</h2>
        <UserInfoForm submit={updateProfile} user={user} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user) => dispatch(updateUserInfo(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
