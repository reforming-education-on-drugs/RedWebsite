import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, Container } from "react-bootstrap";
import auth from "../utils/auth";
import { isExecutive } from "../Constants/auth";

export default function Header() {
  const [executive, setExecutive] = useState(false);

  useEffect(() => {
    isExecutive(auth.currentUser().email).then((res) => {
      setExecutive(res);
    });
  }, []);

  const logout = () => {
    auth
      .currentUser()
      .logout()
      .then(() => window.location.reload())
      .catch(console.error);
  };

  // const [navExpanded, setNavExpanded] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      className="navigation-clean navbar-default"
      expand="xl"
      // onToggle={setNavExpanded}
      // expanded={navExpanded}
    >
      <Container>
        <Navbar.Brand>
          <NavLink
            to="/"
            // onClick={() => setNavExpanded(navExpanded ? false : "expanded")}
          >
            <img
              src={require("../assets/images/Logo.png")}
              id="logo"
              title="logo"
              alt="RED Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="header-nav"
          // onClick={() => setNavExpanded(navExpanded ? false : "expanded")}
        />
        <Navbar.Collapse id="header-nav" className="justify-content-end">
          <Nav
            className="align-items-center"
            // onSelect={() => setNavExpanded(false)}
          >
            <NavDropdown title="About Us" id="about-us-dropdown">
              <NavDropdown.Item href="/about-us/vision">
                Vision
              </NavDropdown.Item>
              <NavDropdown.Item href="/about-us/team">Team</NavDropdown.Item>
              {/* <NavDropdown.Item href="/about-us/constitution">Constitution</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/schools">For Schools</Nav.Link>
            {/* <NavItem href="/parents">For Parents</NavItem> */}
            {/* <NavItem href="/blog">Blog</NavItem> */}
            <Nav.Link href="/get-involved">Get Involved</Nav.Link>
            {auth.currentUser() ? (
              executive ? (
                <>
                  <Nav.Link href="/volunteer">Volunteer</Nav.Link>
                  <NavDropdown title="Executive" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/manage-bookings">
                      Manage Bookings
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={logout}>Log out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/volunteer">Volunteer</Nav.Link>
                  <Nav.Link onClick={logout}>Log out</Nav.Link>
                </>
              )
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {useLocation().pathname != "/booking" &&
            useLocation().pathname != "/volunteer" ? (
              <Nav.Link
                id="book_presentation"
                className="primary_red"
                href="/booking"
              >
                Book a presentation
              </Nav.Link>
            ) : (
              <div></div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
