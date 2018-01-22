import React from "react";

export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="https://www.facebook.com/REDxClub/">
            <i className="icon ion-social-facebook" />
          </a>
          <a className="icons" href="https://www.instagram.com/red_ucalgary/">
            <i className="icon ion-social-instagram" />
          </a>
        </div>
        <ul className="list-inline">
          <li>
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
        <p className="copyright"> © 2017 Reforming Education on Drugs </p>
      </footer>
    </div>
  );
}
