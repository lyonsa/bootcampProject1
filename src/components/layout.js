import React from 'react'
import styled from 'styled-components'

import { Footer, Drawer } from './'
import { Header } from '../containers'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = { isOpen: false }
  }

  handleToggle() {
    console.log('toggled')
    this.setState({isOpen: !this.state.isOpen});
  }

  render(){
    return(
    <Root>
      <Drawer
        handleToggle={this.handleToggle.bind(this)}
        isOpen={this.state.isOpen}
      />
      <Header
        handleToggle={this.handleToggle.bind(this)}
        isOpen={this.state.isOpen}
      />
      <Main>
        { this.props.children }
      </Main>
      <Footer />
    </Root>
  )
}
}
