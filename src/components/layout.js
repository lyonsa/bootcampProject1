import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import LinearProgress from 'material-ui/LinearProgress'

import { Footer, Drawer } from './'
import { Header } from '../containers'
import {
  toggleDrawer,
} from '../actions/layout'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

const Layout = ({ layout, toggleDrawer, children }) => (
  <Root>
    <Drawer
      handleToggle={toggleDrawer}
      isOpen={layout.drawerIsOpen}
    />
    <Header
      handleToggle={toggleDrawer}
      isOpen={layout.drawerIsOpen}
      style={{
        transition: 'visibility 500ms ease-in-out',
        visibility: layout.fullscreen ? 'hidden' : 'visible',
      }}
    />
    <LinearProgress color="#f06292" mode="indeterminate"
      style={{
        transition: 'visibility 300ms ease-out',
        visibility: layout.progressBarShown ? 'visible' : 'hidden',
      }}
    />
    <Main>
      { children }
    </Main>
    <Footer
      style={{
        transition: 'visibility 500ms ease-in-out',
        visibility: layout.fullscreen ? 'hidden' : 'visible',
      }}
    />
  </Root>
)

const mapStateToProps = state => ({
  layout: state.layout
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleDrawer }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
