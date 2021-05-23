import React from 'react';
import ChatCard from './ChatCard';
import { getChats } from '../../store/chats';
import { connect } from 'react-redux';
// import socket from '../../socket';
import { _updateChat } from '../../store/singleChat';

class ChatPanel extends React.Component {
  componentDidMount() {
    const { fetchChats, userId } = this.props;
    fetchChats(userId);
    // socket.on('updated chat', this.handleNewChat);
  }

  // handleNewChat = ({ chat }) => {
  //   const { chats, updateChat } = this.props;
  //   if (
  //     chats.some((localChat) => {
  //       return localChat.id === chat.id;
  //     })
  //   ) {
  //     updateChat(chat);
  //   }
  // };

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  // componentWillUnmount() {
  //   socket.off('updated chat');
  // }

  render() {
    const { chats } = this.props;
    return (
      <div id="chat-panel">
        <div id="chat-search">
          <form id="chat-search-form">
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <div id="chat-card-list">
          {chats.length
            ? chats.map((chat) => <ChatCard chat={chat} key={chat.id} />)
            : 'You have no chats!'}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  chats: state.chats,
  userId: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchChats: (userId) => dispatch(getChats(userId)),
  updateChat: (chat) => dispatch(_updateChat(chat)),
});

export default connect(mapState, mapDispatch)(ChatPanel);
