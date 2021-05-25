import React from "react";

export default function Message({ message, statusClass }) {
  console.log("message is rendering");
  const displayName = message.user ? message.user.displayName : "Admin";
  return (
    <div className={`msg-box ${statusClass}`}>
      <div className={`message-container ${statusClass}`}>
        <span className="msg-username">{displayName}</span>

        <div className={`message ${statusClass}`}>
          <p className="messageContent">{message.content}</p>
        </div>
      </div>
      {message.user && message.user.imageURL && (
        <img src={message.user.imageURL} className="msg-photo" />
      )}
    </div>
  );
}
