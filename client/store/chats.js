import axios from 'axios';

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
    const { data } = await axios.get(`/api/users/${id}/chats`);
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
    default:
      return state;
  }
};
