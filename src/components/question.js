import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
    this.state.timer = setInterval(
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
    // see if component is recieving new question
    if (newProps && newProps.index !== this.props.index) {
      // reset state
      this.setState({
        ...initalState
      })
      // init timer
      this.initTimer()
    }
  }

  revealAnswer() {
    // clear timer
    clearInterval(this.state.timer)
    // disable selections
    this.setState({
      selectionDisabled: true,
      answersShown: true,
    })
    // get next question in 3 seconds
    this.timer = setTimeout(
      this.props.getNextQuestion,
      3000
    )
  }

  handleUserAnswer(e, value) {
    console.log('value', value)
    // get user answer and correct
    const { answer, correct, index } = value
    this.setState({
      selection: index
    })
    // increment score if correct
    if (correct) this.props.incrementPlayerScore(100)
    // if answer push answer
    if (index) this.props.setCurrentQuestionAnswer(
      this.props.index,
      answer,
      correct
    )
    this.revealAnswer()
  }

  render() {
    const { question } = this.props
    const {
      completed,
      time,
      selection,
      answersShown,
      selectionDisabled,
    } = this.state
    return (
      <div>
        <CircularProgress
          mode="determinate"
          value={time}
          color={time > 30 ? '#00bcd4' : '#d40086'}
          thickness={9}
          style={{
            transform: 'scale(-1, -1) rotate(90deg)',
            transition: 'color ease-out 1s'
          }}
        />
        <h1>
          {question.question}
        </h1>
        <RadioButtonGroup onChange={selectionDisabled ? null : this.handleUserAnswer.bind(this)}>
          {question.answers.map((answer, index) =>
            <RadioButton
              key={index}
              label={answer[0]}            
              value={{ answer: answer[0], correct: answer[1], index }}
              disabled={selectionDisabled && selection && index !== selection}
              labelStyle={{
                color: answersShown ? (
                  answer[1] ? '#43a047' : '#d32f2f'
                ) : '#000'
              }}
            />
          )}
        </RadioButtonGroup>
      </div>
    )
  }

}

export default Question
