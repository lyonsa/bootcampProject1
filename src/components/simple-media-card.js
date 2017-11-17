import React from 'react';
import Card, { CardText, CardMedia } from 'material-ui/Card';
import {connect} from 'react-redux';

function SimpleMediaCard(props) {
   return (
    <div>
      <Card style={{height: 200, width: 100}}>
        <img style={{width: 100, margin: 0}} src={props.auth.profile.photoURL}/>
        <CardText style={{paddingRight: 10, paddingLeft: 10, paddingTop: 0, paddingBottom: 0}}>
          <h4 style={{marginBottom: 10, marginTop: 10}}>
            {props.auth.profile.displayName}
          </h4>
          <h4 style={{marginBottom: 0, marginTop: 10}}>
            Lifetime Score: {props.auth.profile.lifetimeScore}
          </h4>
        </CardText>
      </Card>
    </div>
    );
  }

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(SimpleMediaCard);

