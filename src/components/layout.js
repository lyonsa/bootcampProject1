import React from 'react'
import styled from 'styled-components'

import { Footer } from './'
import { Header } from '../containers'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

export default ({ children }) => (
  <Root>
    <Header />
    <Main>
      { children }
    </Main>
    <Footer />
  </Root>
)
