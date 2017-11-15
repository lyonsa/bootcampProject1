import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'

export default class DrawerMenu extends React.Component {

  render() {
    return (
      <div>
        <Drawer  
          openSecondary={true}
          open={this.props.isOpen}
          docked={true}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
