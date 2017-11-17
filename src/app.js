import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import inject from 'react-tap-event-plugin'

import * as Page from './pages'
import { Header } from './containers'
import { Layout } from './components'
import { Router, ProtectedRoute } from './utils'

// for material
inject()

const Heading = styled.h1`
  background: #fff;
  text-align: center;
  font-family: 'Roboto';
`

export default () => (
  <Layout>
    <Router>
      <Route exact path="/" component={Page.Home} />
      <Route path="/sign-in" component={Page.SignIn} />
      <Route path="/profile/:uid" component={Page.Profile} />
      <Route path="/leaderboard" component={Page.Leaderboard} />
      <ProtectedRoute path="/play" component={Page.Play} /> 
      <ProtectedRoute path="/game" component={Page.Game} />
      <Route component={Page.NotFound} />
    </Router>
  </Layout>
)
