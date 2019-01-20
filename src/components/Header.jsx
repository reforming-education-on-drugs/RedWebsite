import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import auth from '../utils/auth';

export default function Header() {
  const logout = () => {
    auth
    .currentUser()
    .logout()
    .then(() => window.location.href = '/')
    .catch(console.error);
  };

  return (
    <Navbar className="navigation-clean">
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">
            <img src={require("../assets/images/Logo.png")} id="logo" title="logo" alt="RED Logo" />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown title="About Us" id="about-us-dropdown">
            <MenuItem href="/about-us/vision">Vision</MenuItem>
            <MenuItem href="/about-us/team">Team</MenuItem>
            <MenuItem href="/about-us/constitution">Constitution</MenuItem>
          </NavDropdown>
          <NavItem href="/schools">For Schools</NavItem>
          <NavItem href="/parents">For Parents</NavItem>
          <NavItem href="/blog">Blog</NavItem>
          <NavItem href="/get-involved">Get Involved</NavItem>
            { 
              auth.currentUser()
                ? <NavItem onClick={logout}>Log out</NavItem>
                : <NavItem href="/login">Login</NavItem>
            }
          <NavItem id="donate" href="/donate">Donate</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
