import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { CLOSE_CHAT, UPDATE_CHAT } from './singleChat';

// Action Type
const GET_CHATS = 'GET_CHATS';

// Action Creators
export const _getChats = (chats) => ({
  type: GET_CHATS,
  chats,
});

// Thunk Creators
export const getChats = (id) => async (dispatch) => {
  try {
    const token = await getAuth().currentUser.getIdToken();
    const { data } = await axios.get(`/api/users/${id}/chats`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_getChats(data));
  } catch (err) {
    console.log('error in chats thunk');
  }
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_CHATS:
      return action.chats;
    case CLOSE_CHAT:
    case UPDATE_CHAT:
      return state.map((chat) => {
        if (chat.id === action.chat.id) return action.chat;
        return chat;
      });
    default:
      return state;
  }
};
