import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <h1>by Artur Zarzycki</h1>
      <a href="https://github.com/artoniaz">
        <FontAwesomeIcon icon={faGithubSquare} className="footer__icon" />
      </a>
      <a href="https://www.linkedin.com/in/artur-za/">
        <FontAwesomeIcon icon={faLinkedin} className="footer__icon" />
      </a>
    </footer>
  );
};

export default Footer;
