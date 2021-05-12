import React from 'react';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import ChatInput from './ChatInput';
import { getChat } from '../../store/singleChat';
import { connect } from 'react-redux';

class ChatRoom extends React.Component {
  componentDidMount() {
    const { selectedChatId, fetchChat, userId } = this.props;
    if (selectedChatId) {
      fetchChat(userId, selectedChatId);
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedChatId, fetchChat, userId } = this.props;
    if (prevProps.selectedChatId !== selectedChatId) {
      fetchChat(userId, selectedChatId);
    }
  }

  render() {
    const { selectedChat, selectedChatId } = this.props;
    const title = selectedChat.title || '';
    const postId = selectedChat.id || 0;
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
  userId: 5,
});

const mapDispatch = (dispatch) => ({
  fetchChat: (userId, chatId) => dispatch(getChat(userId, chatId)),
});

export default connect(mapState, mapDispatch)(ChatRoom);
