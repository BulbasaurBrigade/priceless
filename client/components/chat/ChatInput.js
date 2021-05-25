import React from 'react';
import { connect } from 'react-redux';
import { sentMessage } from '../../store/messages';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { sendMessage, userId, chatId } = this.props;
    sendMessage(userId, chatId, evt.target.content.value);

    this.setState({
      content: '',
    });
  };

  render() {
    const { chatId, selectedChat } = this.props;

    if (!chatId) return '';

    return (
      <div id="chatbox">
        <form id="user-msg-input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="content"
            id="userText"
            placeholder="Type here"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button
            className="button"
            type="submit"
            disabled={!selectedChat.isOpen}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
  selectedChat: state.singleChat,
});

const mapDispatch = (dispatch) => ({
  sendMessage: (userId, chatId, content) => {
    dispatch(sentMessage(userId, chatId, content));
  },
});

export default connect(mapState, mapDispatch)(ChatInput);
