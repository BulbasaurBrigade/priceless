import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { DELETE_POST } from './posts';

// action type
const GET_USER_POSTS = 'GET_USER_POSTS';

// action creator
const _getUserPosts = (userPosts) => {
  return {
    type: GET_USER_POSTS,
    userPosts,
  };
};

// thunk creator
export const getUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const { data } = await axios.get(`/api/users/${userId}/posts`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getUserPosts(data));
    } catch (error) {
      console.log("error fetching user's posts via thunk");
    }
  };
};

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return action.userPosts;
    case DELETE_POST:
      return state.filter((userPost) => userPost.id !== action.post.id);
    default:
      return state;
  }
};
