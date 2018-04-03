import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

import UserSettings from './UserSettings';

export default class AddBusiness extends Component {
  render() {
    return (
      <div style={outerBox}>
        <Card style={cardStyle}>
          <CardHeader
            title="Add a Business"
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
          />

          <div>
            <TextField
              hintText="Enter Business Code"
              /><br />
            <br />
          </div>

          <CardActions>
            <Link to='/UserSettings' >
              <RaisedButton label="OK"  primary={true}/>
            </Link>
            <Link to='/UserSettings' >
              <RaisedButton label="Cancel" secondary={true} />
            </Link>
          </CardActions>

        </Card>
      </div>
    );
  }
}

const outerBox = {
  margin: 'auto',
  width: '50%',
  height: '90%',
  padding: '20px',
  overflow: 'auto',
};

const cardStyle = {
  padding: '20px',
}
