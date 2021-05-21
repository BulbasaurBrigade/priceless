/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { ADD_REQUESTER } from './singlePost';
import { _setCategory, _setBounds } from './postFilters';
import { _isLoading, _formLoading } from './loading';
import { setErrorMsg } from './error';

//action type
const SET_POSTS = 'SET_POSTS';
export const CREATE_POST = 'CREATE_POST';
const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

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
      console.log('error fetching all posts via thunk', err);
    }
  };
};

export const setLocalPosts =
  (north, east, south, west) => async (dispatch, getState) => {
    try {
      dispatch(_setBounds(north, east, south, west));
      const {
        postFilters: { filter },
      } = getState();
      const { data } = await axios.get(
        `/api/posts/filtered?filter=${filter}&n=${north}&e=${east}&s=${south}&w=${west}`
      );
      dispatch(_setPosts(data));
    } catch (err) {
      console.log('error fetching all posts via thunk');
    }
  };

export const setFilteredPosts = (category) => {
  return async (dispatch, getState) => {
    try {
      dispatch(_setCategory(category));
      const {
        postFilters: {
          bounds: { north, east, south, west },
        },
      } = getState();
      const { data } = await axios.get(
        `/api/posts/filtered?filter=${category}&n=${north}&e=${east}&s=${south}&w=${west}`
      );
      dispatch(_setPosts(data));
    } catch (err) {
      console.log('error in set filtered posts thunk', err);
    }
  };
};

export const createPost = (post, userId, history) => {
  return async (dispatch) => {
    try {
      dispatch(_formLoading());
      const { data } = await axios.post(`/api/posts?id=${userId}`, post);
      dispatch(_createPost(data));
      history.push('./posts');
    } catch (err) {
      dispatch(setErrorMsg(err.response.data));
    }
  };
};

export const editPost = (post, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/posts/${post.id}`, post);
      dispatch(_editPost(data));
      history.push('../myposts');
    } catch (err) {
      console.log('error editing post via thunk', err);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`);
      dispatch(_deletePost(data));
    } catch (err) {
      console.log('error deleting post via thunk', err);
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
      return state.map((post) => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      });

    default:
      return state;
  }
};
