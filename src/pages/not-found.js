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
  color: #212121;
`

export default () => (
  <Root>
    <Greeting>
      Not found ):
    </Greeting>
  </Root>
)
