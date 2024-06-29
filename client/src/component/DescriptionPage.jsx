import React from 'react';
import { useParams } from 'react-router-dom';

const DescriptionPage = () => {
  const { lat, lng } = useParams();

  return (
    <div>
      <h2>Description Page</h2>
      <p><strong>Latitude:</strong> {lat}</p>
      <p><strong>Longitude:</strong> {lng}</p>
    </div>
  );
};

export default DescriptionPage;
