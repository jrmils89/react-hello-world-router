import Application from './Pages/Application';
import AboutPage from './Pages/AboutPage';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Application} />
    <Route path="/about" component={AboutPage} />
  </Router>
), document.getElementById('app'))