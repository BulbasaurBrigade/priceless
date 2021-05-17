/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { ADD_REQUESTER } from './singlePost'


//action type
const SET_POSTS = "SET_POSTS";
const CREATE_POST = "CREATE_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";


// action creator
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


export const _editPost = (post) => {
  return {
    type: EDIT_POST,
    post,
  };
};

export const _deletePost = (post) => {
  return {
    type: DELETE_POST,
    post,
  };
};


// thunk creators

export const setPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/posts');
      dispatch(_setPosts(data));
    } catch (err) {
      console.log('error fetching all posts via thunk');
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
      console.log('error in set filtered posts thunk');
    }
  };
};

export const createPost = (post, userId, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/posts?id=${userId}`, post);
      dispatch(_createPost(data));
      history.push('./posts');
    } catch (err) {
      console.log('error creating post via thunk');
    }
  };
};


export const editPost = (post) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/posts/${post.id}`, post);
      dispatch(_editPost(data));
    } catch (err) {
      console.log("error editing post via thunk");
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`);
      dispatch(_deletePost(data));
    } catch (err) {
      console.log("error deleting post via thunk");
    }
  };
};



// reducer

export default (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case CREATE_POST:
      return [...state, action.post];

    case EDIT_POST:
      return state.map((post) =>
        post.id === action.post.id ? action.post : post
      );
    case DELETE_POST:
      return state.filter((post) => post.id !== action.post.id);


    case ADD_REQUESTER:
      return state.map(post => {
        if(post.id === action.post.id) {
          return action.post 
        }
          return post 
      })

    default:
      return state;
  }
};
