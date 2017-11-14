import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  min-height: 80vh;
`

const Greeting = styled.h1`
  color: #fff;
`

class Leaderboard {
  componentWillMount() {
    // fetch leaderboard here
  }

  render() {
    // would be nice to make use of material-ui here
    return (
      <Root>
        <Greeting>Leaderboard</Greeting>
      </Root>
    )
  }
}

export default Leaderboard
