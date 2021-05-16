import axios from "axios";
import { _newMessage } from "./messages";

// Action Type
const GET_CHAT = "GET_CHAT";
export const CLOSE_CHAT = "CLOSE_CHAT";

// Action Creators
const _getChat = (chat) => ({
  type: GET_CHAT,
  chat,
});

const _closeChat = (chat) => ({
  type: CLOSE_CHAT,
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

export const closeChat = (claimOrPass, chatId, postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/posts/${postId}/chats/${chatId}?action=${claimOrPass}`
      );
      dispatch(_closeChat(data.chat));
      dispatch(_newMessage(data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case CLOSE_CHAT:
    case GET_CHAT:
      return action.chat;
    default:
      return state;
  }
};

// This is actually a post with its current chat's status
