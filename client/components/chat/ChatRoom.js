import React from 'react';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import ChatInput from './ChatInput';
import { getChat, _clearChat } from '../../store/singleChat';
import { connect } from 'react-redux';

import { getMessages, _newMessage } from '../../store/messages';
import socket from '../../socket';

class ChatRoom extends React.Component {
  componentDidMount() {
    const { selectedChatId, fetchChatInfo, clearChatInfo, userId, recMessage } =
      this.props;
    if (selectedChatId) {
      fetchChatInfo(userId, selectedChatId);
    } else {
      clearChatInfo();
    }
    socket.on('new message', ({ message }) => {
      recMessage(message);
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedChatId, fetchChatInfo, clearChatInfo, userId } = this.props;
    if (
      prevProps.selectedChatId !== selectedChatId &&
      selectedChatId !== undefined
    ) {
      fetchChatInfo(userId, selectedChatId);
      if (prevProps.selectedChatId) {
        socket.emit('leave room', {
          room: String(prevProps.selectedChatId),
        });
      }
      socket.emit('join room', {
        room: String(selectedChatId),
      });
    } else if (
      prevProps.selectedChatId !== selectedChatId &&
      selectedChatId === undefined
    ) {
      clearChatInfo();
    }
  }

  componentWillUnmount() {
    socket.off('new message');
    this.props.clearChatInfo();
  }

  render() {
    const { selectedChat, selectedChatId } = this.props;
    const title = selectedChat.post ? selectedChat.post.title : '';

    const postId = selectedChat.post ? selectedChat.post.id : 0;

    return (
      <div id="chat-room">
        <ChatHeader postTitle={title} postId={postId} chatId={selectedChatId} />
        <MessageContainer />
        <ChatInput chatId={selectedChatId} />
      </div>
    );
  }
}

const mapState = (state) => ({
  selectedChat: state.singleChat,
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchChatInfo: (userId, chatId) => {
    dispatch(getChat(userId, chatId));
    dispatch(getMessages(userId, chatId));
  },
  clearChatInfo: () => dispatch(_clearChat()),
  recMessage: (message) => dispatch(_newMessage(message)),
});

export default connect(mapState, mapDispatch)(ChatRoom);
