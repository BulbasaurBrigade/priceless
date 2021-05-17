import React from "react";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import ChatInput from "./ChatInput";
import { getChat } from "../../store/singleChat";
import { connect } from "react-redux";
import { getMessages, _newMessage } from "../../store/messages";
import socket from "../../socket";

class ChatRoom extends React.Component {
  componentDidMount() {
    const { selectedChatId, fetchChatInfo, userId, recMessage } = this.props;
    if (selectedChatId) {
      fetchChatInfo(userId, selectedChatId);
    }
    socket.on("new message", ({ message }) => {
      recMessage(message);
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedChatId, fetchChatInfo, userId } = this.props;
    if (prevProps.selectedChatId !== selectedChatId) {
      fetchChatInfo(userId, selectedChatId);
      if (prevProps.selectedChatId) {
        console.log("prevProps.selectedChatId", prevProps.selectedChatId);
        console.log("we are appropriately leaving a room!");
        socket.emit("leave room", {
          room: String(prevProps.selectedChatId),
        });
      }
      console.log("we are in componentDidUpdate");
      socket.emit("join room", {
        room: String(selectedChatId),
      });
    }
  }

  componentWillUnmount() {
    socket.off("new message");
  }

  render() {
    const { selectedChat, selectedChatId } = this.props;
    const title = selectedChat.title || "";
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
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchChatInfo: (userId, chatId) => {
    dispatch(getChat(userId, chatId));
    dispatch(getMessages(userId, chatId));
  },
  recMessage: (message) => dispatch(_newMessage(message)),
});

export default connect(mapState, mapDispatch)(ChatRoom);
