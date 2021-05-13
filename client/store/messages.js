import axios from 'axios';

// Action Types
const GET_MESSAGES = 'GET_MESSAGE';
const NEW_MESSAGE = 'NEW_MESSAGE';

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
    const { data } = await axios.get(
      `/api/users/${userId}/chats/${chatId}/messages`
    );
    dispatch(_getMessages(data));
  } catch (err) {
    console.log('Error in messages route');
  }
};

export const sentMessage = (userId, chatId, content) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/api/users/${userId}/chats/${chatId}/messages`,
      { content }
    );
    dispatch(_newMessage(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case NEW_MESSAGE:
      return [action.message, ...state];
    default:
      return state;
  }
};
