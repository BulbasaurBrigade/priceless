/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import socket from '../socket';
import { _newMessage, CLEAR_CHAT } from './messages';

// Action Type
const GET_CHAT = 'GET_CHAT';
export const CLOSE_CHAT = 'CLOSE_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';

// Action Creators
const _getChat = (chat) => ({
  type: GET_CHAT,
  chat,
});

const _closeChat = (chat) => ({
  type: CLOSE_CHAT,
  chat,
});

export const _updateChat = (chat) => ({
  type: UPDATE_CHAT,
  chat,
});

// Clears the chat info when no chat is selected
export const _clearChat = () => ({
  type: CLEAR_CHAT,
});

// Thunk Creator
export const getChat = (userId, chatId) => {
  return async (dispatch) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const { data } = await axios.get(`/api/users/${userId}/chats/${chatId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_getChat(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Closes the current chat and marks post as passed or claimed
export const closeChat = (claimOrPass, chatId, postId) => {
  return async (dispatch) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const { data } = await axios.put(
        `/api/posts/${postId}/chats/${chatId}?action=${claimOrPass}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_closeChat(data.chat));
      socket.emit('new message', {
        message: data.message,
      });
      socket.emit('updated chat', {
        chat: data.chat,
      });
      dispatch(_newMessage(data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_CHAT:
      return {};
    case UPDATE_CHAT:
    case CLOSE_CHAT:
    case GET_CHAT:
      return action.chat;
    default:
      return state;
  }
};
