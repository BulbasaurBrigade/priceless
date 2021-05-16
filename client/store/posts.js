import axios from "axios";

//action type
const SET_POSTS = "SET_POSTS";
const CREATE_POST = "CREATE_POST";

//action creator
export const _setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

export const _createPost = (post) => {
  return {
    type: CREATE_POST,
    post,
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

export const createPost = (post, userId, history) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/posts?id=${userId}`, post);
    dispatch(_createPost(data));
    history.push("./posts");
    try {
    } catch (err) {
      console.log("error creating post via thunk");
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case CREATE_POST:
      return [...state, action.post];
    default:
      return state;
  }
};
