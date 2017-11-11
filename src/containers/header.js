import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

import { OptionsMenu } from '../components'

const Header = ({ pushRoute }) => (
  <AppBar
    title="Auth App"
    onTitleTouchTap={() => pushRoute('/')}
    iconElementRight={<OptionsMenu />}
    titleStyle={{cursor: 'pointer'}}
  />
)

const mapDispatchToProps = dispatch => (
  bindActionCreators({ pushRoute: routerActions.push }, dispatch)
)

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Header)
)
