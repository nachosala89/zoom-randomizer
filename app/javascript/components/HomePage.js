import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await axios.post('http://127.0.0.1:3000/v1/meetings')
      .then((response) => {
        if (response.status == 200) {
          navigate(`/meeting/${response.data.path}`);
        }
      });
  };
  
  return (
    <div className="container">
      <h1>Meetinger</h1>
      <p>Welcome to the meeting randomizer. Click the following button to start a new session:</p>
      <Button onClick={handleClick}>New Session</Button>
    </div>
  );
}

export default HomePage;
