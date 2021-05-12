import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatCard({ postAndChat }) {
  return (
    <div className="chat-card">
      <span>{postAndChat.title}</span>
    </div>
  );
}
