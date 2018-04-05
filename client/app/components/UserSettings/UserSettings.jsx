import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import './UserSettings.css';

import ChangePassword from './ChangePassword.jsx'
import AddBusiness from './AddBusiness.jsx';
import UserHomepage from '../UserHomepage/UserHomepage.jsx';

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
            <Link to='/UserHomepage'>
              <RaisedButton label="OK"  primary={true}/>
            </Link>
            <Link to='/UserHomepage'>
              <RaisedButton label="Cancel" primary={true} />
            </Link>
            <Link to="/ChangePassword">
              <RaisedButton label="Change Password" primary={true} />
            </Link>
            <Link to='/AddBusiness'>
              <RaisedButton label="Add a business" primary={true} />
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
