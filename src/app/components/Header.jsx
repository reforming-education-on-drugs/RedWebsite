import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, MenuItem } from "react-bootstrap";
import "react-bootstrap/lib/DropdownToggle";

function Header() {
  return (
    <nav className="navbar navbar-default navigation-clean">
      <div className="container">
        <div className="navbar-header">
          <NavLink to="/" className="navbar-brand navbar-link">
            <img src="/assets/img/Logo.png" id="logo" title="logo" alt="RED Logo" />
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="navcol1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Dropdown id="dropdown-about-us">
                <Dropdown.Toggle href="#" bsStyle="link">About Us</Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem href="/about-us/vision">Vision</MenuItem>
                  <MenuItem href="/about-us/team">Team</MenuItem>
                  <MenuItem href="/about-us/constitution">Constitution</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <MenuItem href="/schools">For Schools</MenuItem>
            <MenuItem href="/parents">For Parents</MenuItem>
            <MenuItem href="/blog">Blog</MenuItem>
            <MenuItem href="/get-involved">Get Involved</MenuItem>
            <MenuItem id="donate" href="/donate">Donate</MenuItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
