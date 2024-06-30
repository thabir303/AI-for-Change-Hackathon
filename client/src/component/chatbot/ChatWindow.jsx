import React from 'react';

function ChatWindow({ messages }) {
  const chatWindowStyle = {
    width: '400px',
    height: '500px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: '10px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  };

  const messageStyle = {
    margin: '5px 0',
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '80%',
  };

  const userMessageStyle = {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    color: '#fff',
  };

  const aiMessageStyle = {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    color: '#000',
  };

  return (
    <div style={chatWindowStyle}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            ...messageStyle,
            ...(message.isUser ? userMessageStyle : aiMessageStyle),
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
