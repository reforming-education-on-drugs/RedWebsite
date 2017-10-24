import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div className='header'> 
          <nav className='navbar navbar-default navigation-clean'>
              <div className='container'>
                  <div className='navbar-header'>
                    <a className='navbar-brand navbar-link'>
                      <NavLink to='/'><img src='/assets/img/Logo.png' id='logo' title='logo' /></NavLink>
                    </a>
                    <button className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navcol-1'>
                      <span className='sr-only'>Toggle navigation</span>
                      <span className='icon-bar'></span><span className='icon-bar'></span><span className='icon-bar'></span>
                    </button>
                  </div>
                  <div className='collapse navbar-collapse' id='navcol-1'>
                      <ul className='nav navbar-nav navbar-right'>
                          <li className='dropdown'><a className='dropdown-toggle' data-toggle='dropdown' aria-expanded='false' href='#'>About us<span className='caret'></span></a>
                              <ul className='dropdown-menu' role='menu'>
                                  <li role='presentation'><a href='/about-us/vision/'>Our Vision</a></li>
                                  <li role='presentation'><a href='/about-us/team/'>Our Team</a></li>
                                  <li role='presentation'><a href='/about-us/constitution/'>Our Constitution</a></li>
                              </ul>
                          </li>
                          <li role='presentation'><a href='schools/'>For Schools</a></li>
                          <li role='presentation'><a href='parents/'>For Parents</a></li>
                          <li role='presentation'><a href='blog/'>Blog</a></li>
                          <li role='presentation'><a href='get-involved/'>Get Involved</a></li>
                          <li role='presentation' id='donate'><a href='donate/'>Donate</a></li>
                          <li role='presentation' ><NavLink to='/test'>Test</NavLink></li>
                      </ul>
                  </div>
              </div>
          </nav>
          <div id='spacer'></div>
          <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/test' component={Test} />
            <Route path='*' component={NotFound} />
          </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
const Home = () => {
  return(
      <h2>Hello from Home!</h2>
  )
}
const Test = () => {
  return(
    <main>
      <h2>Testing new route!!</h2>
    </main>
  )
}
const NotFound = () => {
  return(
    <main>
      <h2>This page is not found!</h2>
    </main>
  )
}

export default Navigation