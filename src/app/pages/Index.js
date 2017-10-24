import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import IndexPage from './IndexPage'
import NotFoundPage from './NotFoundPage'

class Index extends Component {
  render() {
    return (
      <Router>
        <div> 
          <Header />
          <Spacer />
          <Switch>
            <Route exact path='/' component={ IndexPage } />
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

export default Index