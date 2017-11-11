import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import DashIcon from 'material-ui/svg-icons/action/dashboard'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'

import { signOut } from '../actions/auth'

class OptionsMenu extends Component {

  render() {
    const { authenticated, user } = this.props.auth
    return (
      <IconMenu
        iconButtonElement={
          <IconButton style={authenticated ? {padding: '0px'} : null}>
            { authenticated ? <Avatar src={user.photoURL} padding="0" /> : <MoreVertIcon color="#000" /> }
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        { authenticated ?
          <div>
            <Subheader>Hello, {user.displayName || 'User'}!</Subheader>
            <MenuItem
              primaryText="My Profile"
              rightIcon={<AccountIcon />}
            />
            <MenuItem
              primaryText="Dashboard"
              rightIcon={<DashIcon />}
            />
            <MenuItem
              primaryText="Sign out"
              rightIcon={<ExitIcon />}
              onTouchTap={this.props.signOut}
            />
          </div> :
          <MenuItem
            primaryText="Sign in"
            onTouchTap={() => this.props.pushRoute('/sign-in')}
          />
        }
      </IconMenu>
    )
  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ signOut, pushRoute: routerActions.push }, dispatch)
)

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(OptionsMenu)
)