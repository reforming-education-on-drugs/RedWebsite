import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import InvitePage from "./InvitePage";
import ConfirmationPage from "./ConfirmationPage";
import VisionPage from "./VisionPage";
import TeamPage from "./TeamPage";
import ConstitutionPage from "./ConstitutionPage";
import SchoolPage from "./SchoolPage";
import ParentPage from "./ParentPage";
import BlogPage from "./BlogPage";
import GetInvolvedPage from "./GetInvolvedPage";
import DonatePage from "./DonatePage";
import NotFoundPage from "./NotFoundPage";
import PasswordResetPage from "./PasswordResetPage";
import PasswordRecoveryPage from "./PasswordRecoveryPage";
import ContactUsPage from "./ContactUsPage";
import VolunteerPage from "./VolunteerPage";
import PresentationBooking from "./PresentationBooking";
import PresentationBookingWizard from "./PresentationBookingWizard";
import Footer from "../components/Footer";

// Presentation pages
// import DrugOverviewPage from "./DrugOverviewPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
function App() {
  if (window.location.hash.includes("#confirmation_token=")) {
    window.location.href =
      "/confirmation/#confirmation_token=" + window.location.hash.substring(20);
  }
  return (
    <Router>
      <div>
        <Header />
        <div id="spacer" />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/invite" component={InvitePage} />
          <Route path="/confirmation" component={ConfirmationPage} />
          <Route exact path="/about-us/vision" component={VisionPage} />
          <Route exact path="/about-us/team" component={TeamPage} />
          <Route
            exact
            path="/about-us/constitution"
            component={ConstitutionPage}
          />
          <Route exact path="/schools" component={SchoolPage} />
          <Route exact path="/parents" component={ParentPage} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/get-involved" component={GetInvolvedPage} />
          <Route exact path="/donate" component={DonatePage} />
          <Route exact path="/old-booking" component={PresentationBooking} />
          <Route exact path="/booking" component={PresentationBookingWizard} />
          <Route exact path="/contact-us" component={ContactUsPage} />
          <Route exact path="/volunteer" component={VolunteerPage} />
          <Route exact path="/faq" component={NotFoundPage} />
          <Route path="/password-reset" component={PasswordResetPage} />
          <Route path="/recover" component={PasswordRecoveryPage} />
          {/* <Route
              path="/presentations/drug-overview"
              component={DrugOverviewPage}
            /> */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
