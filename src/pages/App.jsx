import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import InvitePage from "./InvitePage";
import VisionPage from "./VisionPage";
import TeamPage from "./TeamPage";
import ConstitutionPage from "./ConstitutionPage";
import SchoolPage from "./SchoolPage";
import BookingPage from "./BookingPage";
import ParentPage from "./ParentPage";
import BlogPage from "./BlogPage";
import GetInvolvedPage from "./GetInvolvedPage";
import DonatePage from "./DonatePage";
import NotFoundPage from "./NotFoundPage";
import ContactUsPage from "./ContactUsPage";
import Gsheet from "./Gsheet";
import VolunteerPage from "./VolunteerPage"
import Footer from "../components/Footer";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <Router>
      <div>
        <Header />
        <div id="spacer" />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/invite" component={InvitePage} />
          <Route exact path="/about-us/vision" component={VisionPage} />
          <Route exact path="/about-us/team" component={TeamPage} />
          <Route exact path="/about-us/constitution" component={ConstitutionPage} />
          <Route exact path="/schools" component={SchoolPage} />
          <Route exact path="/parents" component={ParentPage} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/get-involved" component={GetInvolvedPage} />
          <Route exact path="/donate" component={DonatePage} />
          <Route exact path="/booking" component={BookingPage} />
          <Route exact path="/contact-us" component={ContactUsPage} />
          <Route exact path="/gsheet" component={Gsheet} />
          <Route exact path="/volunteer" component={VolunteerPage} />
          <Route exact path="/faq" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
