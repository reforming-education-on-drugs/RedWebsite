import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import VisionPage from "./pages/VisionPage";
import TeamPage from "./pages/TeamPage";
import ConstitutionPage from "./pages/ConstitutionPage";
import SchoolPage from "./pages/SchoolPage";
import ParentPage from "./pages/ParentPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import DonatePage from "./pages/DonatePage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUsPage from "./pages/ContactUsPage";
import Footer from "./components/Footer";

function Main() {
  return (
    <Router>
      <div>
        <Header />
        <Spacer />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/about-us/vision" component={VisionPage} />
          <Route exact path="/about-us/team" component={TeamPage} />
          <Route exact path="/about-us/constitution" component={ConstitutionPage} />
          <Route exact path="/schools" component={SchoolPage} />
          <Route exact path="/parents" component={ParentPage} />
          <Route exact path="/blog" component={NotFoundPage} />
          <Route exact path="/get-involved" component={GetInvolvedPage} />
          <Route exact path="/donate" component={DonatePage} />
          <Route exact path="/booking" component={NotFoundPage} />
          <Route exact path="/contact-us" component={ContactUsPage} />
          <Route exact path="/faq" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

function Spacer() {
  // Spacer required to separate main content from navigation bar
  return (<div id="spacer" />);
}

ReactDOM.render(<Main />, document.getElementById("main-content"));
