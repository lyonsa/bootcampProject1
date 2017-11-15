import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DrawerMenu extends React.Component {

  render() {
    return (
      <div>
        <Drawer  
          openSecondary={true}
          open={this.props.isOpen}
          docked={true}
        >
          <MenuItem
            primaryText="Profile"
            onTouchTap={() => this.props.pushRoute('/profile/me')}
          />
          <MenuItem
            primaryText="Home"
            onTouchTap={() => this.props.pushRoute('/')}
          /> 
          <MenuItem
            primaryText="Game"
            onTouchTap={() => this.props.pushRoute('/game')}
          />        
         </Drawer>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => (
  bindActionCreators({ pushRoute: routerActions.push }, dispatch)
)


export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(DrawerMenu)
)