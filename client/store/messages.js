import axios from 'axios';
import { getAuth } from 'firebase/auth';
import socket from '../socket';

// Action Types
const GET_MESSAGES = 'GET_MESSAGE';
const NEW_MESSAGE = 'NEW_MESSAGE';
export const CLEAR_CHAT = 'CLEAR_CHAT';

// Action Creators
export const _getMessages = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

export const _newMessage = (message) => ({
  type: NEW_MESSAGE,
  message,
});

// Thunk Creators
export const getMessages = (userId, chatId) => async (dispatch) => {
  try {
    const token = await getAuth().currentUser.getIdToken();
    const { data } = await axios.get(
      `/api/users/${userId}/chats/${chatId}/messages`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_getMessages(data));
  } catch (err) {
    console.log('Error in messages route');
  }
};

export const sentMessage = (userId, chatId, content) => async (dispatch) => {
  try {
    const token = await getAuth().currentUser.getIdToken();
    const { data } = await axios.post(
      `/api/users/${userId}/chats/${chatId}/messages`,
      { content },
      {
        headers: {
          authorization: token,
        },
      }
    );

    socket.emit('new message', {
      message: data,
    });
    dispatch(_newMessage(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case CLEAR_CHAT:
      return [];
    case GET_MESSAGES:
      return action.messages;
    case NEW_MESSAGE:
      return [action.message, ...state];
    default:
      return state;
  }
};
