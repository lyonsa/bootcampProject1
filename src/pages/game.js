import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'

const mapDispatchToProps = dispatch => (
  bindActionCreators({ pushRoute: routerActions.push }, dispatch)
)

const mapStateToProps = state => ({
  auth: state.auth
})

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const Greeting = styled.h1`
  color: #212121;
`

const buttonMixin = {
  margin: '7.5px'
}

const HomePage = ({ pushRoute, auth }) => {
  const { authenticated, user } = auth
  return (
    <Root>
      <Greeting>Game route</Greeting>
    </Root>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
)
