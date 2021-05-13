import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatCard({ chat }) {
  return (
    <div className={`chat-card ${chat.isOpen ? '' : 'closed'}`}>
      <Link to={`/chat/${chat.id}`}>{chat.post.title}</Link>
    </div>
  );
}
