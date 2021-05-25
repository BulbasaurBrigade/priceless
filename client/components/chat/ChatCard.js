import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ChatCard(props) {
  const { chat, singleChat } = props;
  console.log(chat);
  return (
    <div
      className={`chat-card ${
        !chat.isOpen || chat.post.status === 'deleted' ? 'closed' : ''
      }`}
    >
      <Link to={`/chat/${chat.id}`}>
        <h3>{chat.post.title}</h3>
        {singleChat.poster ? (
          <>
            <p>
              <span style={{ color: 'green' }}>Poster: </span>
              {singleChat.poster.displayName}
            </p>
            <p>
              <span style={{ color: 'green' }}>Recipient: </span>
              {singleChat.recipient.displayName}
            </p>
          </>
        ) : (
          ''
        )}
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    singleChat: state.singleChat,
  };
};

export default connect(mapStateToProps)(ChatCard);
