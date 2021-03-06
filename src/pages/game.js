import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { setProgressBarShown } from '../actions/layout'
import { Question, GameHeader } from '../components'
import { 
  incrementPlayerScore,
  setCurrentQuestionAnswer,
  finishCurrentGame,
  initGame
} from '../actions/game'

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    pushRoute: routerActions.push,
    setProgressBarShown,
    initGame,
    finishCurrentGame,
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
  color: #fff;
`

const MainGame = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  getNextQuestion() {
    if (this.state.index > 4) {
      return this.props.pushRoute('/')
    } else {
      this.setState({
        index: this.state.index + 1
      })
    }
  }

  render() {
    const { 
      incrementPlayerScore,
      setCurrentQuestionAnswer,
      finishCurrentGame,
    } = this.props
    const { game, opponent } = this.props.game
    const { profile } = this.props.auth
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
            <Card style={{
              width: '70%',
              padding: '50px 0'
            }}>
              <MainGame>
                <GameHeader
                  blackText
                  showName
                  player1={profile}
                  player2={opponent}
                />
                <Question
                  index={index}
                  question={game.questions[index]}
                  getNextQuestion={this.getNextQuestion.bind(this)}
                  incrementPlayerScore={incrementPlayerScore}
                  setCurrentQuestionAnswer={setCurrentQuestionAnswer}
                  finishCurrentGame={finishCurrentGame}
                />
            </MainGame>
          </Card>
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
