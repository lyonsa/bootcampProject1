import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'
import he from 'he'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import styled from 'styled-components'

const initalState = {
  // 1 time -> 0.1 seconds
  time: 100,
  timer: null,
  selectionDisabled: false,
  answersShown: false,
  selection: null
}

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = initalState
    this.initTimer()
  }

  initTimer() {
    this.timer = setInterval(
      this.onTick.bind(this),
      100
    )
  }

  onTick() {
    if (this.state.time) {
      // decrement timer
      this.setState({
        time: this.state.time - 1
      })
    } else {
      this.revealAnswer()
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.index !== this.props.index) {
      console.log('UPDATING QUESTION COMPONENT')
      console.log('THIS.PROPS.INDEX !== OLDPROPS.INDEX')
      // clear timeout
      clearTimeout(this.timer)   
      // reset state
      this.setState({
        ...initalState
      })   
      // init timer
      this.initTimer()
    }
  }

  componentwillUnmount() {
    clearInterval(this.timer)
    clearTimeout(this.timer)
  }

  revealAnswer() {
    // clear timer
    clearInterval(this.timer)
    // disable selections
    this.setState({
      selectionDisabled: true,
      answersShown: true,
    })
    // get next question in 3 seconds
    this.timer = setTimeout(
      this.getNextQuestion.bind(this),
      2000
    )
  }

  getNextQuestion() {
    const { index } = this.props
    if (index < 4) {
      this.props.getNextQuestion()
    } if (index >= 4) {
      this.props.finishCurrentGame()
    }
  }

  handleUserAnswer(e, value) {
    if (this.state.selection) return
    // get user answer and correct
    const { answer, correct, index } = value
    this.setState({
      selection: index
    })
    // increment score if correct
    if (correct) this.props.incrementPlayerScore(100)
    // if answer push answer
    if (this.props.index !== null) this.props.setCurrentQuestionAnswer(
      this.props.index,
      answer,
      correct
    )
    this.revealAnswer()
  }

  render() {
    const { question, index } = this.props
    const {
      completed,
      time,
      selection,
      answersShown,
      selectionDisabled,
    } = this.state

    return (
      <Card style={{width: '70%'}}>
        <CardText containerStyle={'inline'} children={'<h1>hi</h1>'}>
          <CircularProgress
            mode="determinate"
            value={time}
            color={time > 30 ? '#00bcd4' : '#d40086'}
            thickness={9}
            style={{
              display: 'inline',
              transform: 'scale(-1, -1) rotate(90deg)',
              transition: 'color ease-out 1s',
              paddingTop: '15px',
              paddingLeft: '20%'
            }}
          />
          <h1 style={{float: 'right', 
          top: '50%', margin: '0', 
          paddingRight: '20%', 
          paddingTop: '3px', 
          color: '#00bcd4'}}>{index}/5</h1>
        </CardText>
        <CardText style={{'text-align': 'center', float: 'clear', }}>
          {question && question.question ? he.decode(question.question) : null}
        </CardText>
        <CardText>
        <RadioButtonGroup onChange={selectionDisabled ? null : this.handleUserAnswer.bind(this)}>
          {question && question.answers ? question.answers.map((answer, index) =>
            <RadioButton
              name={index}
              key={index}
              label={he.decode(answer[0])}            
              value={{ answer: answer[0], correct: answer[1], index }}
              disabled={selectionDisabled && selection && index !== selection}
              labelStyle={{
                color: answersShown ? (
                  answer[1] ? '#43a047' : '#d32f2f'
                ) : '#000',
                fontWeight: answersShown ? 'bold' : 'normal'
              }}
            />
          ) : null}
        </RadioButtonGroup>
        </CardText>
      </Card>
    )
  }

}

export default Question
