import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { incrementPlayerScore, setCurrentQuestionAnswer } from '../actions/game'

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    incrementPlayerScore,
    setCurrentQuestionAnswer
  }, dispatch)
)

const mapStateToProps = state => ({
  game: state.game
})

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: 100,
      color: 'blue',

    };
  }



  componentDidMount() {
    let color = '#00bcd4';
    this.setState({color});
    this.timer = setTimeout(() => this.progress(100), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.componentDidMount()
  }

  progress(completed) {
    if (completed === 0) {
      this.setState({completed: 0});
      // this.nextQuestion();
      this.componentWillUnmount();
    } else {
      if (completed === 30){
        let color = '#d40086'
        this.setState({color})
      }
      this.setState({completed});
      const diff = 1;
      this.timer = setTimeout(() => this.progress(completed - diff), 100);
    }
  }

  render() {
    return (
      <div>
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          color={this.state.color}
          thickness={9}
        />
      </div>
    );
  }
}


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Question)
)