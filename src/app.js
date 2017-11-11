import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import inject from 'react-tap-event-plugin'

import * as Page from './pages'
import { Header } from './containers'
import { Layout } from './components'

// for material
inject()

const Heading = styled.h1`
  background: #fff;
  text-align: center;
  font-family: 'Roboto';
`

export default () => (
  <Layout>
    <Route exact path="/" component={Page.Home} />
    <Route path="/sign-in" component={Page.SignIn} />
  </Layout>
)
