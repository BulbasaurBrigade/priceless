import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default function ChatCard(props) {
  const { chat } = props;
  console.log("chat", chat);
  return (
    <div className={`chat-card ${chat.isOpen ? "" : "closed"}`}>
      <Link to={`/chat/${chat.id}`}>
        <h3>{chat.post.title}</h3>
        <p>
          <span style={{ color: "green" }}>Poster: </span>
          {chat.poster.displayName}
        </p>
        <p>
          <span style={{ color: "green" }}>Recipient: </span>
          {chat.recipient.displayName}
        </p>
      </Link>
    </div>
  );
}
