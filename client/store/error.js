// Action Types
export const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setErrorMsg = (errMsg) => ({
  type: SET_ERROR,
  errMsg,
});

// Reducer
const noError = '';
export default (state = noError, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.errMsg;
    default:
      return noError;
  }
};
