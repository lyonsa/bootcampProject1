import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import {SimpleMediaCard} from '../components'

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

const TestPage = (auth) => {
  const { authenticated, user } = auth
  return (
    <Root>
        <SimpleMediaCard auth={auth} />
    </Root>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TestPage)
)
