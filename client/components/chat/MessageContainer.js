import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const MessageContainer = ({ messages, userId }) => {
  return (
    <div id="message-container">
      {messages.length
        ? messages.map((message) => {
            let styleClass;
            switch (+message.userId) {
              case userId:
                styleClass = 'sent';
                break;
              case 0:
                styleClass = 'admin';
                break;
              default:
                styleClass = 'received';
                break;
            }
            return (
              <Message
                message={message}
                key={message.id}
                statusClass={styleClass}
              />
            );
          })
        : ''}
    </div>
  );
};

const mapState = (state) => ({
  messages: state.messages,
  userId: state.auth.id,
});

export default connect(mapState)(MessageContainer);
