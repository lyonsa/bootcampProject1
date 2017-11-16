import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { setProgressBarShown } from '../actions/layout'
import { initGame } from '../actions/game'

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    pushRoute: routerActions.push,
    setProgressBarShown,
    initGame
  }, dispatch)
)

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game,
})

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const Message = styled.h1`
  color: #212121;
`

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
  }

  componentWillMount() {
    this.props.setProgressBarShown(true)
    this.props.initGame()
  }

  componentWillReceiveProps(newProps) {
    const { game } = newProps.game
    // if game is ready
    if (game && game.uid2 && game.questions) {
      this.props.setProgressBarShown(false)
    } else {
      this.props.setProgressBarShown(true)
    }
  }

  componentWillUnmount() {
    // dispatch FINISH_GAME_SUCCESS
    this.props.setProgressBarShown(false)
  }

  shouldComponentUpdate() {
    // hook in to index
    // if index > 5; route to game-log
    return true
  }

  render() {
    const { game } = this.props.game
    console.log(this.props)
    return (
      <Root>
        {
          !game || !game.uid2 || !game.questions ?
            <Message>
              Waiting for { game && !game.uid2 ? 'player 2' : 'questions' }...
            </Message>
          :
            <Message>
              Game will start soon...
            </Message>
        }
      </Root>
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game)
)
