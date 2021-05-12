import axios from 'axios';

// Action Type
const GET_CHAT = 'GET_CHAT';

// Action Creators
const _getChat = (chat) => ({
  type: GET_CHAT,
  chat,
});

// Thunk Creator
export const getChat = (userId, chatId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/chats/${chatId}`);
      dispatch(_getChat(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case GET_CHAT:
      return action.chat;
    default:
      return state;
  }
};
