import React, { useState } from 'react';
import axios from 'axios';

function Gemini({ dataPrompt }) {
  const [response, setResponse] = useState('');

  const hardcodedPrompt = " These include the maximum temperature in given city during the month of June.  We are trying to find the best solution to mitigate the worst condition of the city, where the temperature increases not only due to direct sunlight but also due to other factors such as: Urban topography and architecture ,Lack of green spaces, Emissions from vehicles and factories, Urbanization ,Air pollution, Color of urban surfaces ,Heat emission from power plants and industries ,Humidity Now, considering the local infrastructure of the city, provide appropriate solutions. Specify how many trees should be planted considering the current number of trees and what kinds of steps should be taken considering the present infrastructure. Provide a 1-2 / 2-3 year plan for infrastructural development. Also, mention the current green situation of the city and what it should be. List the local species of trees to be planted. You have to provide current green canopy and what should be improved using specific number.All output should be professional, not explained briefly. you have to attentive on numerical solution not descriptive";

  const handleGenerate = async () => {
    const prompt = `${dataPrompt}\n\n${hardcodedPrompt}`;
    try {
      const res = await axios.post('http://localhost:3000/api/gemini/generate', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error fetching the response:', error);
      setResponse('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="gemini-component">
      <header className="gemini-header">
        <h1>Google Generative AI</h1>
        <button onClick={handleGenerate}>Generate Analysis</button>
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
