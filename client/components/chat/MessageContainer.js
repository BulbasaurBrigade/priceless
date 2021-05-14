import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const MessageContainer = ({ messages, userId }) => {
  console.log(messages);
  return (
    <div id="message-container">
      {messages.length
        ? messages.map((message) => (
            <Message
              message={message}
              key={message.id}
              statusClass={+message.userId === userId ? 'sent' : 'received'}
            />
          ))
        : ''}
    </div>
  );
};

const mapState = (state) => ({
  messages: state.messages,
  userId: state.auth.id,
});

export default connect(mapState)(MessageContainer);
