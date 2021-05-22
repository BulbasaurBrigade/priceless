import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfoForm from "../UserAuth/UserInfoForm";

class EditProfile extends React.Component {
  render() {
    const { displayName, updateUser } = this.props;
    return (
      <div className="form-container">
        <h2>Edit your display name and location</h2>
        <UserInfoForm submit={updateUser} displayName={displayName} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.displayName,
    lat: state.auth.latitude,
    lng: state.auth.longitude,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateUser: (user) => dispatch(editUser(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
