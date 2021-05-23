/* eslint-disable no-console */
import { io } from 'socket.io-client';
import store from './store';
import { _newMessage } from './store/messages';
import { _updatePost } from './store/posts';
import { _updateChat } from './store/singleChat';

const socket = io();

// debugging func to log all events received by client
socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on('new message', ({ message }) => {
  store.dispatch(_newMessage(message));
});

socket.on('post status update', ({ post }) => {
  store.dispatch(_updatePost(post));
});

socket.on('updated chat', ({ chat }) => {
  const { chats } = store.getState();
  if (chats.some((localChat) => localChat.id === chat.id)) {
    store.dispatch(_updateChat(chat));
  }
});

export default socket;
