// import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <h1 className='falling-text'>Welcome to Our AI-based solution</h1>
      <p className='falling-subtext'>Project Cool City</p>
      <Link to="/map">Get Started</Link>
    </div>
  );
}

export default Homepage;