import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import IndexPage from './pages/IndexPage'
import SchoolPage from './pages/SchoolPage'
import NotFoundPage from './pages/NotFoundPage'

class Main extends Component {
  render() {
    return (
      <Router>
        <div> 
          <Header />
          <Spacer />
          <Switch>
            <Route exact path='/' component={ IndexPage } />
            <Route exact path='/schools' component={ SchoolPage } />
            <Route path='*' component={ NotFoundPage } />
          </Switch>
        </div>
      </Router>
    )
  }
}

class Spacer extends Component {
  // Spacer required to separate main content from navigation bar
  render() { return( <div id='spacer' /> ) }
}

ReactDOM.render(<Main />, document.getElementById('main-content'));