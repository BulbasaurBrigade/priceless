import React from 'react';

export default function Message({ message, statusClass }) {
  console.log('message is rendering');
  return (
    <div className={`msg-box ${statusClass}`}>
      <span className="msg-username">{message.user.displayName}</span>
      <div className={`message ${statusClass}`}>
        <p className="messageContent">{message.content}</p>
      </div>
    </div>
  );
}
