import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <div className="container-fluid position-fixed bottom-0 footer">
    <div className="d-flex justify-content-center align-items-center">
      <span>Made by Nacho Sala</span>
      <a href="https://www.linkedin.com/in/nacho-sala/">
        <FontAwesomeIcon icon={faLinkedin} className="ps-2 pt-1 brand-icon" />
      </a>
      <a href="https://github.com/nachosala89">
        <FontAwesomeIcon icon={faGithub} className="ps-2 pt-1 brand-icon" />
      </a>
    </div>
  </div>
);


export default Footer;