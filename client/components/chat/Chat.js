import React from 'react';
import ChatPanel from './ChatPanel';
import ChatRoom from './ChatRoom';

export default class Chat extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="chat">
        <ChatPanel />
        <ChatRoom />
      </div>
    );
  }
}
