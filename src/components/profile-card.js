import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { routerActions } from 'react-router-redux'
import firebase from 'firebase'
import { firebaseAuth, firebasePlayers, firebaseDb } from '../firebase'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';

import { signOut } from '../actions/auth'


class ProfileCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleChange(event) {
      this.setState({ value: event.target.value });
  }

  keyPress(event){
    if(event.keyCode == 13){
      if (event.target.value !== ''){
        firebasePlayers.child(this.props.auth.user.uid).update({ displayName: event.target.value })
        this.handleReduce();
      }
    }
  }

  render() {
    const { authenticated, user, profile } = this.props.auth
    return (
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        { authenticated ? 
          <CardHeader
            title={profile.displayName ? profile.displayName : profile}
            subtitle="Profile"
            avatar={user.photoURL}
          /> : null}
          { authenticated ?
          <div>
            <CardText>
              You are signed in and ready to play!
            </CardText>
            <CardText>
              Other players will see your name as <u>{ profile.displayName ? profile.displayName : profile }</u>
            </CardText>
          </div> : 
          <CardText>
              You are not signed in! You can't play yet.
          </CardText> }
          <CardText expandable={true}>
            <TextField
              user={user}
              hintText={user ? user.displayName : null}
              floatingLabelText="New Display Name"
              type="text"
              value={this.state.value}
              onKeyDown={this.keyPress}
              onChange={this.handleChange}
            />
          </CardText>
          { authenticated ?
          <CardActions>
            <FlatButton 
              onTouchTap={this.handleExpand}
              label="Change Name" />
            <FlatButton 
              onTouchTap={this.props.signOut} 
              label="Sign Out" />
          </CardActions> :
          <CardActions>
            <FlatButton             
              onTouchTap={() => this.props.pushRoute('/sign-in')}
              label="Sign In" />
          </CardActions>
          }
        </Card>
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
  )(ProfileCard)
)