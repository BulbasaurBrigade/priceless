import React from 'react';
import ChatCard from './ChatCard';
import { getChats } from '../../store/chats';
import { connect } from 'react-redux';

class ChatPanel extends React.Component {
  componentDidMount() {
    const { fetchChats, userId } = this.props;
    fetchChats(userId);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    // refer to chats store for full, weird, format
    const { chats } = this.props;
    return (
      <div id="chat-panel">
        <div id="chat-search">
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
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
  userId: 5,
});

const mapDispatch = (dispatch) => ({
  fetchChats: (userId) => dispatch(getChats(userId)),
});

export default connect(mapState, mapDispatch)(ChatPanel);
