import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import './UserSettings.css';

import ChangePassword from './ChangePassword'
import AddBusiness from './AddBusiness';
import UserHomepage from '../UserHomepage/UserHomepage';

class UserSettings extends Component {

  componentDidMount(){

  }


  render() {

    return(
      <div className='USETT-outer-box'>
        <Card className='card-padding'>
          <CardHeader
            title="Update User Settings"
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
          />

        <div >
          <div  className='USETT-float-left'>
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

          <div className='USETT-float-right'>

            <TextField
              hintText="Email"
              /><br />
            <br />

            <TextField
              hintText="Address"
              /><br />
            <br />
          </div>
        </div>

          <CardActions>
            <Link to='/user/homepage'>
              <RaisedButton label="OK"  primary={true}/>
            </Link>
            <Link to='/user/homepage'>
              <RaisedButton label="Cancel" primary={true} />
            </Link>
            <Link to="/user/password">
              <RaisedButton label="Change Password" primary={true} />
            </Link>
            <Link to='/business/add_business'>
              <RaisedButton disabled={true} label="Add a business" primary={true} />
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
