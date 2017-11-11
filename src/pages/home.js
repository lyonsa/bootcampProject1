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
  color: #fff;
`

const buttonMixin = {
  margin: '7.5px'
}

const HomePage = ({ pushRoute, auth }) => {
  const { authenticated, user } = auth
  return (
    <Root>
      { authenticated ?
        <Greeting>Hello there, {auth.user.displayName || 'User'}!</Greeting> :
        <RaisedButton
          label="Sign in"
          onTouchTap={() => pushRoute('/sign-in')}
          style={buttonMixin}
        />
      }
    </Root>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
)
