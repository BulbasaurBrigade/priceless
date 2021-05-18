import React from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../store/auth';
import UserInfoForm from './UserInfoForm';

function MoreInfo({ createProfile }) {
  return (
    <div>
      <div className="form-container">
        <h2>Please Complete Your User Profile</h2>
        <UserInfoForm submit={createProfile} />
      </div>
    </div>
  );
}

const mapDispatch = (dispatch) => ({
  createProfile: (user) => dispatch(updateUserInfo(user)),
});

export default connect(null, mapDispatch)(MoreInfo);
