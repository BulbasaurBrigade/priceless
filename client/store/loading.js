/* eslint-disable no-underscore-dangle */
import { SET_AUTH } from './auth';
import { CREATE_POST } from './posts';
import { SET_ERROR } from './error';

// Action Types
const IS_LOADING = 'IS_LOADING';

// Action Creators
export const _isLoading = () => ({
  type: IS_LOADING,
});

// Reducer
export default (state = true, action) => {
  switch (action.type) {
    case IS_LOADING:
      return true;
    case CREATE_POST:
    case SET_AUTH:
    case SET_ERROR:
      return false;
    default:
      return state;
  }
};
