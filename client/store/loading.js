/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
import { SET_AUTH } from './auth';
import { CREATE_POST } from './posts';
import { SET_POSTFORM_ERROR, SET_USERPROFILE_ERROR } from './error';

// Action Types
const IS_LOADING = 'IS_LOADING';
const FORM_LOADING = 'FORM_LOADING';

// Action Creators
export const _isLoading = () => ({
  type: IS_LOADING,
});

export const _formLoading = () => ({
  type: FORM_LOADING,
});

// Reducer
const loadingState = {
  general: true,
  submit: false,
};
export default (state = loadingState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, general: true };
    case FORM_LOADING:
      return { ...state, submit: true };
    case CREATE_POST:
    case SET_POSTFORM_ERROR:
    case SET_USERPROFILE_ERROR:
    case SET_AUTH:
    default:
      return loadingState;
  }
};
