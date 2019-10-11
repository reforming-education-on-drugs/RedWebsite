import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import auth from '../utils/auth';

export default function Header() {
  const logout = () => {
    auth
      .currentUser()
      .logout()
      .then(() => window.location.reload())
      .catch(console.error);
  };

  return (
    <Navbar className="navigation-clean">
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">
            <img
              src={require('../assets/images/Logo.png')}
              id="logo"
              title="logo"
              alt="RED Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown title="About Us" id="about-us-dropdown">
            <MenuItem href="/about-us/vision">Vision</MenuItem>
            <MenuItem href="/about-us/team">Team</MenuItem>
            {/* <MenuItem href="/about-us/constitution">Constitution</MenuItem> */}
          </NavDropdown>
          <NavItem href="/schools">For Schools</NavItem>
          {/* <NavItem href="/parents">For Parents</NavItem> */}
          {/* <NavItem href="/blog">Blog</NavItem> */}
          <NavItem href="/get-involved">Get Involved</NavItem>
          {auth.currentUser() ? (
            <>
              <NavItem href="/volunteer">Volunteer</NavItem>
              <NavItem onClick={logout} style={{ marginRight: '5em' }}>
                Log out
              </NavItem>
            </>
          ) : (
            <NavItem href="/login" style={{ marginRight: '8em' }}>
              Login
            </NavItem>
          )}
          <NavItem id="primary" href="/booking">
            Book a presentation
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
