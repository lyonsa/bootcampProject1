import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { setProgressBarShown } from '../actions/layout'
import { Question } from '../components'
import { 
  incrementPlayerScore,
  setCurrentQuestionAnswer,
  initGame
} from '../actions/game'

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    pushRoute: routerActions.push,
    setProgressBarShown,
    initGame,
    incrementPlayerScore,
    setCurrentQuestionAnswer,
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

  shouldComponentUpdate(newState) {
    // hook in to index
    if (newState.index > 4) return false
    else return true
  }

  getNextQuestion() {
    this.setState({
      index: this.state.index + 1
    })
  }

  render() {
    const { incrementPlayerScore, setCurrentQuestionAnswer } = this.props
    const { game } = this.props.game
    const { index } = this.state
    console.log(this.props)
    return (
      <Root>
        {
          !game || !game.uid2 || !game.questions ?
            <Message>
              Waiting for { game && !game.uid2 ? 'player 2' : 'questions' }...
            </Message>
          :
            <Question
              index={index}
              question={game.questions[index]}
              getNextQuestion={this.getNextQuestion.bind(this)}
              incrementPlayerScore={incrementPlayerScore}
              setCurrentQuestionAnswer={setCurrentQuestionAnswer}
            />
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
