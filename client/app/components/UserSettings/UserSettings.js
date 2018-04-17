import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import ChangePassword from './ChangePassword'
import AddBusiness from './AddBusiness';
import UserHomepage from '../UserHomepage/UserHomepage';

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
            subtitle=""
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
          <Link to='/UserHomepage'>
            <RaisedButton label="OK"  primary={true}/>
          </Link>
          <Link to='/UserHomepage'>
            <RaisedButton label="Cancel" primary={true} />
          </Link>
          <Link to="/ChangePassword">
            <RaisedButton label="Change Password" secondary={true} />
          </Link>
          <Link to='/AddBusiness'>
            <RaisedButton label="Add a business" secondary={true} />
          </Link>
        </CardActions>
        </Card>

        <div>
          <Route path="/UserHomepage" component={UserHomepage} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path='/AddBusiness' component={AddBusiness} />
        </div>
      </div>
    );
  }
}

export default UserSettings;

const outerBox = {
  margin: 'auto',
  width: '75%',
  height: 'auto',
  padding: '20px',
  overflow: 'auto',
};

const cardStyle = {
  height: 'auto',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: 'beige',
}

const flexColumn = {
  display: 'flex',
  flexDirection: 'row',
}

const column = {
  margin: 'auto',
}
