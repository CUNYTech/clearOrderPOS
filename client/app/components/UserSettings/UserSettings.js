import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import ChangePassword from './ChangePassword'
import AddBusiness from './AddBusiness';
import UserHomepage from '../UserHomepage/UserHomepage';

import {outerBox, cardStyle, flexColumn, column} from '../../styles/cardStyle';

class UserSettings extends Component {

  componentDidMount(){
    axios.get('/auth-test')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response)
      })
  }


  render() {

    return(
      <div style={outerBox}>
        <Card style={cardStyle}>
          <CardHeader
            title="Update User Settings"
            actAsExpander={false}
            showExpandableButton={false}
          />

        <CardText style={flexColumn}>
          <div style={column}>
            <TextField
              hintText="First Name"
              /><br />
            <br />

            <TextField
              hintText="Last Name"
              /><br />
            <br />

            <TextField
              hintText="Phone #"
              /><br />
            <br />
          </div>

          <div style={column}>
            <TextField
              hintText="Email"
              /><br />
            <br />

            <TextField
              hintText="Address"
              /><br />
            <br />
          </div>
        </CardText>

        <CardActions >
          <Link to='/user/homepage'>
            <RaisedButton label="OK"  primary={true}/>
          </Link>
          <Link to='/user/homepage'>
            <RaisedButton label="Cancel" primary={true} />
          </Link>
          <Link to="/user/password">
            <RaisedButton label="Change Password" secondary={true} />
          </Link>
          <Link to='/user/addBusiness'>
            <RaisedButton label="Add a business" secondary={true} />
          </Link>
        </CardActions>
        </Card>
      </div>
    );
  }
}

export default UserSettings;
