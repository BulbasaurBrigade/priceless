import { SET_AUTH } from "./auth";
import { CREATE_POST } from "./posts";

const IS_LOADING = "IS_LOADING";

export const _isLoading = () => {
  return {
    type: IS_LOADING,
  };
};

export default (state = true, action) => {
  switch (action.type) {
    case IS_LOADING:
      return true;
    case CREATE_POST:
    case SET_AUTH:
      return false;
    default:
      return state;
  }
};
