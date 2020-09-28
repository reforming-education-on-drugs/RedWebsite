import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import auth from "../utils/auth";

export default function Header() {
  const logout = () => {
    auth
      .currentUser()
      .logout()
      .then(() => window.location.reload())
      .catch(console.error);
  };

  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      className="navbar-default"
      expand="lg"
      variant="dark"
      fixed="top"
      onToggle={setNavExpanded}
      expanded={navExpanded}
    >
      <Container>
        <Navbar.Brand>
          <NavLink
            to="/"
            onClick={() => setNavExpanded(navExpanded ? false : "expanded")}
          >
            <img
              src={require("../assets/images/Logo_white.png")}
              id="logo"
              title="RED"
              alt="RED"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setNavExpanded(navExpanded ? false : "expanded")}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav onSelect={() => setNavExpanded(false)}>
            <NavDropdown title="about" id="about-us-dropdown">
              <NavDropdown.Item href="/about-us/vision">
                vision
              </NavDropdown.Item>
              <NavDropdown.Item href="/about-us/team">team</NavDropdown.Item>
              {/* <MenuItem href="/about-us/constitution">Constitution</MenuItem> */}
            </NavDropdown>
            <Nav.Link href="/schools">for schools</Nav.Link>
            {/* <NavItem href="/parents">For Parents</NavItem> */}
            {/* <NavItem href="/blog">Blog</NavItem> */}
            <Nav.Link href="/get-involved">get involved</Nav.Link>
            {auth.currentUser() ? (
              <>
                <Nav.Link href="/volunteer">volunteer</Nav.Link>
                <Nav.Link onClick={logout} /* style={{ marginRight: "5em" }} */>
                  log out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login" /* style={{ marginRight: "8em" }} */>
                login
              </Nav.Link>
            )}
            {window.location.pathname != "/booking" ? (
              <></>
            ) : (
              // <Nav.Link id="primary" href="/booking">
              //   Book a presentation
              // </Nav.Link>
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
