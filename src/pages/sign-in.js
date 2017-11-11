import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RaisedButton from 'material-ui/RaisedButton'

import { signInWithGoogle, signInWithGithub, signInWithFacebook } from '../actions/auth'

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signInWithGoogle, signInWithGithub, signInWithFacebook }, dispatch)
)

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const buttonMixin = {
  margin: '7.5px'
}

const SignInPage = ({ signInWithGoogle, signInWithGithub, signInWithFacebook }) => (
  <Root>
    <RaisedButton
      label="Sign in with Google"
      onTouchTap={signInWithGoogle}
      style={buttonMixin}
    />
    <RaisedButton
      label="Sign in with Github"
      onTouchTap={signInWithGithub}
      style={buttonMixin}
    />
    <RaisedButton
      label="Sign in with Facebook"
      onClick={signInWithFacebook}
      style={buttonMixin}
    />
  </Root>
)

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignInPage)
)
