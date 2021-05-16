import React from "react";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import ChatInput from "./ChatInput";
import { getChat } from "../../store/singleChat";
import { connect } from "react-redux";
import { getMessages } from "../../store/messages";

class ChatRoom extends React.Component {
  componentDidMount() {
    const { selectedChatId, fetchChatInfo, userId } = this.props;
    if (selectedChatId) {
      fetchChatInfo(userId, selectedChatId);
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedChatId, fetchChatInfo, userId } = this.props;
    if (prevProps.selectedChatId !== selectedChatId) {
      fetchChatInfo(userId, selectedChatId);
    }
  }

  render() {
    const { selectedChat, selectedChatId } = this.props;
    const title = selectedChat.title || "";
    const postId = selectedChat.post ? selectedChat.post.id : 0;
    console.log("selected chat", selectedChat);
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
});

export default connect(mapState, mapDispatch)(ChatRoom);
