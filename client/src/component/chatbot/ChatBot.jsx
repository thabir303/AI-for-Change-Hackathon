import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

function ChatBot() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, isUser = true) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, isUser }]);
  };

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  };

  return (
    <div style={appStyle}>
      <ChatWindow messages={messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
}

export default ChatBot;
