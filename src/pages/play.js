import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import styled from 'styled-components'

import { initQueueState } from '../actions/queue'

const mapDispatchToProps = dispatch => (
  bindActionCreators({ pushRoute: routerActions.push, initQueueState }, dispatch)
)

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

class Play extends Component {
  componentWillMount() {
    this.props.initQueueState()
  }

  render() {
    return (
      <Root>
        <Greeting>
          You're in the queue!
        </Greeting>
      </Root>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Play)
