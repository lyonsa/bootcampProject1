import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #fff
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

const Score = styled.strong`
  margin-top: 10px;
`

export default ({ player1, player2 }) => (
  <Root>
    <Player>
      <Avatar src={player1 ? player1.photoURL : null} />
      <Score>
        {player1 ? player1.lifetimeScore : null}
      </Score>
    </Player>
    <strong>vs</strong>
    <Player>
      <Avatar src={player2 ? player2.photoURL : null} />
      <Score>
        {player2 ? player2.lifetimeScore : null}
      </Score>
    </Player>
  </Root>
)
