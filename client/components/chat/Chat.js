import React from "react";
import ChatPanel from "./ChatPanel";
import ChatRoom from "./ChatRoom";

export default class Chat extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div id="chat">
        <ChatPanel selectedChatId={params.chatId} />
        <ChatRoom selectedChatId={params.chatId} />
      </div>
    );
  }
}
