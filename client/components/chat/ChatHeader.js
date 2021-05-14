import React from "react";

export default class ChatHeader extends React.Component {
  render() {
    const { postTitle, postId, chatId } = this.props;
    console.log(postId);
    return (
      <div id="chat-header">
        <span>Title Placeholder {postTitle}</span>
        <div id="button-group">
          <button className="button" type="button" disabled={postId === 0}>
            claimed
          </button>
          <button className="button" type="button" disabled={postId === 0}>
            pass
          </button>
        </div>
      </div>
    );
  }
}
