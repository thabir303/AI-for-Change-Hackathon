// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the home page content.</p>
      <Link to="/map">Go to Map</Link>
    </div>
  );
};

export default Home;
