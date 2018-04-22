import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

import {outerBox, cardStyle} from '../../styles/cardStyle';

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
