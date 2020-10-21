import React from "react";
import Ionicon from "react-ionicons";
import "../styles/Footer-Basic.css";

export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a className="icons" href="https://www.facebook.com/REDxClub/">
            <Ionicon icon="logo-facebook" className="icon" />
          </a>
          <a className="icons" href="https://www.instagram.com/red_ucalgary/">
            <Ionicon icon="logo-instagram" className="icon" />
          </a>
          <a className="icons" href="https://twitter.com/red_ucalgary">
            <Ionicon icon="logo-twitter" className="icon" />
          </a>
        </div>
        <ul className="list-inline">
          <li>
            <a href="/donate">Donate</a>
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
        <p className="copyright"> © 2020 Reforming Education on Drugs </p>
      </footer>
    </div>
  );
}
