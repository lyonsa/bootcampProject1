import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'

import { Avatar } from 'material-ui'

import { firebaseGames, firebasePlayers } from '../firebase/index';
import { setProgressBarShown } from '../actions/layout'

import { GameHeader, CenteredRoot } from '../components'

class GameLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      player1: null,
      player2: null,
      game: null,
    }
  }

  componentDidMount() {
    const { gid } = this.props.match.params
    const ref = firebaseGames.child(gid)
    if (this.props.auth.authenticated) {
      // watch firebase for state
      this.watchState(ref)
    } else {
      // call public api and dont watch
      this.fetchGameStateAndPlayers()
    }
    this.props.setProgressBarShown(true)
  }

  async watchState(ref) {
    // watch game state
    this.updateGameStateCallback = ref
      .on('value', snap => this.updateGameState(snap))
    // get uid1 & uid2
    const snap = await ref.once('value')
    const game = snap.val()
    // watch players
    this.updatePlayer1Callback = firebasePlayers.child(game.uid1)
      .on('value', snap => this.updatePlayer(snap, 0))
    this.updatePlayer2Callback = firebasePlayers.child(game.uid2)
      .on('value', snap => this.updatePlayer(snap, 1))
  }

  updateGameState(snap) {
    this.setState({
      game: snap.val()
    })
  }

  updatePlayer(snap, index) {
    if (index === 0) {
      this.setState({
        player1Id: snap.key,
        player1: snap.val(),
      })
    } else {
      this.setState({
        player2Id: snap.key,
        player2: snap.val(),
      })
    }
  }

  async fetchGameStateAndPlayers() {
    try {
      const { gid } = this.props.match.params
      // fetch data
      const { game, player1, player2 } = await axios.get(
        `https://unc-trivia-app-api.herokuapp.com/games/${gid}?withPlayers=true`
      )
      // update state
      this.setState({ game, player1, player2 })
    } catch (err) { console.error(`error: ${err.message}`) }
  }

  componentWillUpdate(newProps, newState) {
    const { game, player1, player2 } = newState
    // hide progress bar
    if (game && player1 && player2) {
      this.props.setProgressBarShown(false)
    }
  }

  componentWillUnmount() {
    // unregister watchers
    const { game, player1, player2 } = this.state
    const { gid } = this.props.match.params
    // unregister player1callback
    if (game && typeof this.updatePlayer1Callback === 'function') {
      firebasePlayers.child(game.uid1)
        .off('value', this.updatePlayer1Callback)
    }
    // unregister player2callback
    if (game && typeof this.updatePlayer2Callback === 'function') {
      firebasePlayers.child(game.uid2)
        .off('value', this.updatePlayer2Callback)
    }
    // unreigster game state callback
    if (typeof this.updateGameStateCallback === 'function') {
      firebaseGames.child(gid)
        .off('value', this.updateGameStateCallback)
    }
    // hide progress bar
    this.props.setProgressBarShown(false)
  }

  calculatePlayerScore(index) {
    const { game, player1Id, player2Id } = this.state
    const id = index === 1 ? player1Id : player2Id
    if (game && game.answers && game.answers[id]) {
      return game.answers[id].filter(a => a.correct).length * 100
    }
    return 0
  }

  getPlayerFirstName(index) {
    const { player1, player2 } = this.state
    const player = index === 1 ? player1 : player2
    return player ? player.displayName.split(' ')[0] : ''
  }

  render() {
    const {
      game,
      player1,
      player2,
      player1Id,
      player2Id
    } = this.state
    const score1 = this.calculatePlayerScore(1)
    const score2 = this.calculatePlayerScore(2)
    const name1 = this.getPlayerFirstName(1)
    const name2 = this.getPlayerFirstName(2)
    return (
      <CenteredRoot style={{minHeight: '80vh'}}>
        {
          !game || !player1 || !player2 ? <h1>Fetching game...</h1> :
            <div>
              <GameHeader
                showName
                showScore
                player1={player1}
                player2={player2}
                player1Score={score1}
                player2Score={score2}
              />
              <strong style={{color: '#fff'}}>
                {score1 === score2 ? 'Draw!' : (
                  score1 > score2 ? `${name1} won!` : `${name2} won!`
                )}
              </strong>
            </div>
        }
      </CenteredRoot>
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setProgressBarShown }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLog)
