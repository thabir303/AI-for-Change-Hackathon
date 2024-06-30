import React, { useState } from 'react';
import axios from 'axios';

function ChatInput({ addMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input);  // Add user's message immediately
      setInput('');  // Clear the input field
      try {
        const response = await axios.post('http://localhost:3000/api/gemini/chat', { message: input });
        addMessage(response.data.response, false);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const chatInputStyle = {
    display: 'flex',
    width: '400px',
    marginTop: '10px',
  };

  const inputStyle = {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0084ff',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  return (
    <form onSubmit={handleSubmit} style={chatInputStyle}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Send</button>
    </form>
  );
}

export default ChatInput;
