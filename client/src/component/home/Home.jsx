// // Home.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page!</h1>
//       <p>This is the home page content.</p>
//       <Link to="/map">Go to Map</Link>
//     </div>
//   );
// };

// export default Home;


// import React from 'react';
// import './App.css';
import Homepage from '../Homepage'; // Ensure this path is correct
import bgVideo from '../../assets/bg.mp4';

function Home() {
  return (
    <div className="app-container">
      <video className="video-background" autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <Homepage />
      </div>
    </div>
  );
}

export default Home;