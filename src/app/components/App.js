import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/test' component={Test} />
            <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
const Home = () => <h1>Hello from Home!</h1>
const Test = () => <h1>Testing new route!!</h1>
const NotFound = () => <h1>This page is not found!</h1>

export default App