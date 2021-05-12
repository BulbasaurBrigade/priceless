import React from 'react';
import Message from './Message';

export default class MessageContainer extends React.Component {
  render() {
    return (
      <div id="message-container">
        <Message />
      </div>
    );
  }
}
