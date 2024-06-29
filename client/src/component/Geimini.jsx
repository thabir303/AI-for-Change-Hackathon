import React, { useState } from 'react';
import axios from 'axios';

function Gemini() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/gemini/generate', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error fetching the response:', error);
      setResponse('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Generative AI</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            required
          />
          <button type="submit">Generate</button>
        </form>
        {response && (
          <div className="response">
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default Gemini;
