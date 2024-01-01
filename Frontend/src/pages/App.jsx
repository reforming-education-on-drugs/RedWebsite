import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import IndexPage from "./IndexPage";
import LoginPage from "./userPages/LoginPage";
import InvitePage from "./userPages/InvitePage";
import ConfirmationPage from "./userPages/ConfirmationPage";
import VisionPage from "./informationalPages/VisionPage";
import TeamPage from "./informationalPages/TeamPage";
import ConstitutionPage from "./informationalPages/ConstitutionPage";
import SchoolPage from "./informationalPages/SchoolPage";
import ParentPage from "./informationalPages/ParentPage";
import BlogPage from "./informationalPages/BlogPage";
import GetInvolvedPage from "./informationalPages/GetInvolvedPage";
import DonatePage from "./informationalPages/DonatePage";
import NotFoundPage from "./informationalPages/NotFoundPage";
import PasswordResetPage from "./userPages/PasswordResetPage";
import PasswordRecoveryPage from "./userPages/PasswordRecoveryPage";
import ContactUsPage from "./informationalPages/ContactUsPage";
import VolunteerPage from "./VolunteerPage";
import ManageBookingsPage from "./ManageBookingsPage";
import ManageUsersPage from "./ManageUsersPage";
import PresentationBooking from "./PresentationBooking";
import PresentationBookingWizard from "./PresentationBookingWizard";
import Footer from "../components/Footer";

// Presentation pages
import DrugOverviewPage from "./informationalPages/DrugOverviewPage";

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
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/about-us/team" component={TeamPage} />
          <Route exact path="/about-us/vision" component={VisionPage} />
          <Route
            exact
            path="/about-us/constitution"
            component={ConstitutionPage}
          />
          <Route exact path="/schools" component={SchoolPage} />
          <Route exact path="/parents" component={ParentPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/invite" component={InvitePage} />
          <Route exact path="/confirmation" component={ConfirmationPage} />
          <Route exact path="/volunteer" component={VolunteerPage} />
          <Route exact path="/get-involved" component={GetInvolvedPage} />
          <Route exact path="/manage-bookings" component={ManageBookingsPage} />
          <Route exact path="/manage-users" component={ManageUsersPage} />
          <Route exact path="/donate" component={DonatePage} />
          <Route exact path="/contact-us" component={ContactUsPage} />
          <Route path="/password-reset" component={PasswordResetPage} />
          <Route path="/recover" component={PasswordRecoveryPage} />
          <Route exact path="/old-booking" component={PresentationBooking} />
          <Route exact path="/booking" component={PresentationBookingWizard} />
          <Route
            path="/presentations/drug-overview"
            component={DrugOverviewPage}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>

        {/* <Switch>
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
          <Route exact path="/manage-bookings" component={ManageBookingsPage} />
          <Route exact path="/manage-users" component={ManageUsersPage} />
          <Route exact path="/faq" component={NotFoundPage} />
          <Route path="/password-reset" component={PasswordResetPage} />
          <Route path="/recover" component={PasswordRecoveryPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch> */}
        {/* <Route
              path="/presentations/drug-overview"
              component={DrugOverviewPage}
            /> */}
        <Footer />
      </div>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
