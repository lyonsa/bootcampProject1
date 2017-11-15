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

export default () => (
  <Root>
    <Greeting>
    ...Searching for a Competitor!
    </Greeting>
    <Greeting>
    Please Wait For Another Player To Join You!
    </Greeting>
  </Root>
)