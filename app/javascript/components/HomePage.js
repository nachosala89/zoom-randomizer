import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import arrow from "/app/assets/images/arrow.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await axios.post('http://127.0.0.1:3000/v1/meetings')
      .then((response) => {
        if (response.status == 200) {
          navigate(`/${response.data.path}`);
        }
      });
  };
  
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-3 offset-md-3 d-flex justify-content-center">
          <button onClick={handleClick} className="big-button p-4">START<br />SESSION</button>
        </div>
        <div className="col-md-6 mt-5 mt-md-0">
          <ul>
            <li className="d-flex align-items-center mt-1">
              <img src={arrow} className="arrow me-1" />
              <span>Start a new session.</span>
            </li>
            <li className="d-flex align-items-center mt-1">
              <img src={arrow} className="arrow me-1" />
              <span>Share the link to your partners.</span>
            </li>
            <li className="d-flex align-items-center mt-1">
              <img src={arrow} className="arrow me-1" />
              <span>Add your names.</span>
            </li>
            <li className="d-flex align-items-center mt-1">
              <img src={arrow} className="arrow me-1" />
              <span>Pick one!</span>
            </li>
          </ul>
        </div>     
      </div>
    </div>
  );
}

export default HomePage;
