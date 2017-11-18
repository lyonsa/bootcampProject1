import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${props => props.blackText ? '#000' : '#fff'};
`

const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Avatar = styled.img`
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin: 0 25px;
  &:hover {
    cursor: pointer
  }
`

const Label = styled.strong`
  margin: 10px 0;
`

export default ({ player1, player2, player1Score, player2Score, showScore, showName, blackText }) => (
  <Root blackText={blackText}>
    <Player>
      <Avatar src={player1 && showName ? player1.photoURL : null} />
      <Label key={0}>
        {player1 && showName ? player1.displayName.split(' ')[0] : null}
      </Label>
      <Label key={1}>
        {player1Score && showScore ? player1Score : '0'}
      </Label>
    </Player>
    <strong>vs</strong>
    <Player>
      <Avatar src={player2 ? player2.photoURL : null} />
      <Label key={0}>
        {player2 && showName ? player2.displayName.split(' ')[0] : null}
      </Label>
      <Label key={1}>
        {player2Score && showScore ? player2Score : '0'}
      </Label>
    </Player>
  </Root>
)
