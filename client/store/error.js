/* eslint-disable no-underscore-dangle */
// Action Types
export const SET_POSTFORM_ERROR = 'SET_ERROR';
export const SET_PREVIEWLOCATION_ERROR = 'SET_PREVIEWLOCATION_ERROR';
export const SET_USERPROFILE_ERROR = 'SET_USERPROFILE_ERROR';

const CLEAR_ERRORS = 'CLEAR_ERRORS';

// Action Creators
export const setPostFormErrorMsg = (errMsg) => ({
  type: SET_POSTFORM_ERROR,
  errMsg,
});

export const setPreviewLocationError = (errMsg) => ({
  type: SET_PREVIEWLOCATION_ERROR,
  errMsg,
});

export const setUserProfileError = (errMsg) => ({
  type: SET_USERPROFILE_ERROR,
  errMsg,
});

export const _clearErrors = () => ({
  type: CLEAR_ERRORS,
});

// Reducer
const noErrors = { postForm: '', previewLocation: '', userProfile: '' };
export default (state = noErrors, action) => {
  switch (action.type) {
    case SET_PREVIEWLOCATION_ERROR:
      return { ...noErrors, previewLocation: action.errMsg };
    case SET_POSTFORM_ERROR:
      return { ...noErrors, postForm: action.errMsg };
    case SET_USERPROFILE_ERROR:
      return { ...noErrors, userProfile: action.errMsg };
    case CLEAR_ERRORS:
    default:
      return noErrors;
  }
};
