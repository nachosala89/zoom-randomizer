import React from "react";
import axios from 'axios';

const HomePage = () => {  
  const handleClick = async () => {
    const response = await axios.post('http://127.0.0.1:3000/v1/meetings');
    console.log(response);
  };
  
  return (
    <>
      <h1>Welcome to the meeting randomizer</h1>
      <p>Click the following button to start a new session:</p>
      <button onClick={handleClick}>New Session</button>
    </>
  );
}

export default HomePage;
