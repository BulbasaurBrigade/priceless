// Action Types
export const SET_POSTFORM_ERROR = 'SET_ERROR';
export const SET_PREVIEWLOCATION_ERROR = 'SET_PREVIEWLOCATION_ERROR';

// Action Creators
export const setPostFormErrorMsg = (errMsg) => ({
  type: SET_POSTFORM_ERROR,
  errMsg,
});

export const setPreviewLocationError = (errMsg) => ({
  type: SET_PREVIEWLOCATION_ERROR,
  errMsg,
});

// Reducer
const noErrors = { postForm: '', previewLocation: '' };
export default (state = noErrors, action) => {
  switch (action.type) {
    case SET_PREVIEWLOCATION_ERROR:
      return { ...state, previewLocation: action.errMsg };
    case SET_POSTFORM_ERROR:
      return { ...state, postForm: action.errMsg };
    default:
      return noErrors;
  }
};
