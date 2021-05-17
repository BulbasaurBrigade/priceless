import React from 'react';
import { closeChat } from '../../store/singleChat';
import { connect } from 'react-redux';

class ChatHeader extends React.Component {
  handleClick = (e) => {
    const action = e.target.name;
    const { postId, chatId } = this.props;
    this.props.changeChat(action, chatId, postId);
  };

  render() {
    const { postTitle, postId, chatId } = this.props;

    return (
      <div id="chat-header">
        <span>{postTitle}</span>
        <div id="button-group">
          {postId ? (
            <>
              <button
                className="button"
                type="button"
                disabled={postId === 0}
                name="claim"
                onClick={this.handleClick}
              >
                claimed
              </button>
              <button
                className="button"
                type="button"
                disabled={postId === 0}
                name="pass"
                onClick={this.handleClick}
              >
                pass
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeChat: (claimOrPass, chatId, postId) =>
      dispatch(closeChat(claimOrPass, chatId, postId)),
  };
};

export default connect(null, mapDispatchToProps)(ChatHeader);
