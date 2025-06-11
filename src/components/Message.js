import React from 'react';

function Message({ type, text }) {
  return (
    <div className={`message ${type}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;
