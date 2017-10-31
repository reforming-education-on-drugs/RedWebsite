import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import SchoolPage from "./pages/SchoolPage";
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
