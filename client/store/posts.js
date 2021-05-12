import axios from "axios";

//action type
const SET_POSTS = "SET_POSTS";

//action creator
export const _setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

//thunk
export const setPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/posts");
      dispatch(_setPosts(data));
    } catch (err) {
      console.log("error fetching all posts via thunk");
    }
  };
};

export const setFilteredPosts = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/posts/filtered?filter=${category}`
      );
      dispatch(_setPosts(data));
    } catch (err) {
      console.log("error in set filtered posts thunk");
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    default:
      return state;
  }
};
