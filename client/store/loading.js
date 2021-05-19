import { SET_AUTH } from './auth';

export default (state = true, action) => {
  switch (action.type) {
    case SET_AUTH:
      return false;
    default:
      return state;
  }
};
