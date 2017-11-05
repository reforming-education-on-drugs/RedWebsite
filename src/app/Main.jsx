import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import SchoolPage from "./pages/SchoolPage";
import ParentPage from "./pages/ParentPage";
import ConstitutionPage from "./pages/ConstitutionPage";
import VisionPage from "./pages/VisionPage";
import TeamPage from "./pages/TeamPage";
import NotFoundPage from "./pages/NotFoundPage";

function Main() {
  return (
    <Router>
      <div>
        <Header />
        <Spacer />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/schools" component={SchoolPage} />
          <Route exact path="/parents" component={ParentPage}/>
          <Route exact path="/about-us/constitution" component={ConstitutionPage}/>
          <Route exact path="/about-us/vision" component={VisionPage}/>
          <Route exact path="/about-us/team" component={TeamPage}/>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

function Spacer() {
  // Spacer required to separate main content from navigation bar
  return (<div id="spacer" />);
}

ReactDOM.render(<Main />, document.getElementById("main-content"));
