import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

import {outerBox, cardStyle} from '../../styles/cardStyle';

export default class ChangePassword extends Component {
  render() {
    return (
      <div style={outerBox}>
        <Card style={cardStyle}>
          <CardHeader
            title="Change Password"
            actAsExpander={false}
            showExpandableButton={false}
          />

          <div>
            <TextField
              hintText="Old Password"
              /><br />
            <br />

            <TextField
              hintText="New Password"
              /><br />
            <br />

            <TextField
              hintText="Retype Password"
              /><br />
            <br />
          </div>

          <CardActions>
            <Link to='/user/settings' >
              <RaisedButton label="OK"  primary={true}/>
            </Link>
            <Link to='/user/settings' >
              <RaisedButton label="Cancel" secondary={true} />
            </Link>
          </CardActions>

        </Card>
      </div>
    );
  }
}
