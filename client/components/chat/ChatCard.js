import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatCard({ postAndChat }) {
  const { recipient } = postAndChat;
  const rec = recipient[0];
  const { chat } = rec;
  return (
    <div className="chat-card">
      <Link to={`/chat/${chat.id}`}>{postAndChat.title}</Link>
    </div>
  );
}
