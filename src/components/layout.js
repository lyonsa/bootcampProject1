import React from 'react'
import styled from 'styled-components'

import { Footer } from './'
import { Header } from '../containers'
import { Drawer } from './'

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
    this.setState({open: !this.state.isOpen});
  }

  render(){
    return(
    <Root>
      {this.state.isOpen ? <Drawer />: null}
      <Header handleToggle={() => this.handleToggle.bind(this)} isOpen={this.state.isOpen}/>
      <Main>
        { this.props.children }
      </Main>
      <Footer />
    </Root>
  )
}
}
