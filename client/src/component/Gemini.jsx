import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Gemini.css';

function Gemini({ dataPrompt }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const hardcodedPrompt = "These include the maximum temperature in given city during the month of June.  We are trying to find the best solution to mitigate the worst condition of the city, where the temperature increases not only due to direct sunlight but also due to other factors such as: Urban topography and architecture ,Lack of green spaces, Emissions from vehicles and factories, Urbanization ,Air pollution, Color of urban surfaces ,Heat emission from power plants and industries ,Humidity Now, considering the local infrastructure of the city, provide appropriate solutions. Specify how many trees should be planted considering the current number of trees and what kinds of steps should be taken considering the present infrastructure. Provide a 1-2 / 2-3 year plan for infrastructural development. Also, mention the current green situation of the city and what it should be. List the local species of trees to be planted. You have to provide current green canopy and what should be improved using specific number.All output should be professional, not explained briefly. you have to attentive on numerical solution not descriptive";

  const handleGenerate = async () => {
    const prompt = `${dataPrompt}\n\n${hardcodedPrompt}`;
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/gemini/generate', { prompt });
      setResponse(res.data.response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the response:', error);
      setResponse('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const formatResponse = (responseText) => {
    const lines = responseText.split('\n');
    let formattedContent = [];
    let currentList = null;

    lines.forEach((line, index) => {
      if (line.startsWith('**')) {
        if (currentList) {
          formattedContent.push(<ul key={`list-${index}`} className="response-list">{currentList}</ul>);
          currentList = null;
        }
        formattedContent.push(<h3 key={index} className="response-heading">{line.replace(/\*\*/g, '')}</h3>);
      } else if (line.trim().startsWith('-')) {
        if (!currentList) {
          currentList = [];
        }
        currentList.push(<li key={`item-${index}`} className="response-list-item">{line.trim().substring(1).trim()}</li>);
      } else {
        if (currentList) {
          formattedContent.push(<ul key={`list-${index}`} className="response-list">{currentList}</ul>);
          currentList = null;
        }
        if (line.trim()) {
          formattedContent.push(<p key={index} className="response-paragraph">{line}</p>);
        }
      }
    });

    if (currentList) {
      formattedContent.push(<ul key="final-list" className="response-list">{currentList}</ul>);
    }

    return formattedContent;
  };

  return (
    <div className="gemini-container">
      <header className="gemini-header">
        <h1 className="gemini-title">Google Generative AI Analysis</h1>
        <button 
          className="generate-button" 
          onClick={handleGenerate} 
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Analysis'}
        </button>
      </header>
      {response && (
        <div className="response-section">
          <h2 className="response-title">Analysis Results</h2>
          <div className="response-content">
            {formatResponse(response)}
          </div>
        </div>
      )}
    </div>
  );
}

Gemini.propTypes = {
  dataPrompt: PropTypes.string.isRequired
};

export default Gemini;
