import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import styled from 'styled-components'

import { initQueueState } from '../actions/queue'
import { setProgressBarShown } from '../actions/layout'

const Root = styled.main`
  min-height: 80vh;
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

class Play extends Component {
  componentWillMount() {
    console.log(this.props)
    this.props.setProgressBarShown(true)
    this.props.initQueueState()
  }

  render() {
    return (
      <Root>
        <Greeting>
          Searching for a game...
        </Greeting>
      </Root>
    )
  }

  componentWillUnmount() {
    this.props.setProgressBarShown(false)
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    pushRoute: routerActions.push,
    initQueueState,
    setProgressBarShown,
  }, dispatch)
)

export default connect(
  null,
  mapDispatchToProps
)(Play)
