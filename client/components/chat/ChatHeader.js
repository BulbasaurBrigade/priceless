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
    const { postTitle, postId, chatId, singleChat, userId } = this.props;

    return (
      <div id="chat-header">
        {singleChat.poster ? (
          <>
            <h1>{postTitle}</h1>
            <div id="chat-header-details">
              <div>
                <p>
                  <span style={{ color: 'green' }}>Poster: </span>
                  {singleChat.poster.displayName}
                </p>
                <p>
                  <span style={{ color: 'green' }}>Recipient: </span>
                  {singleChat.recipient.displayName}
                </p>
              </div>

              <button
                className="button"
                type="button"
                disabled={postId === 0}
                name="claim"
                onClick={this.handleClick}
                style={{
                  visibility:
                    userId === singleChat.posterId ? 'visible' : 'hidden',
                }}
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
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleChat: state.singleChat,
    userId: state.auth.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeChat: (claimOrPass, chatId, postId) =>
      dispatch(closeChat(claimOrPass, chatId, postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
