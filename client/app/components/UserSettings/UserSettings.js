import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect } from 'react-router'

import ChangePassword from './ChangePassword'
import AddBusiness from './AddBusiness';
import UserHomepage from '../UserHomepage/UserHomepage';

import {oldOuterBox, oldCardStyle, flexColumn, column} from '../../styles/cardStyle';

class UserSettings extends Component {

  constructor(){
    super();
    this.state = {
      fname : '',
      lname : '',
      email : '',
      message : '',
      hasErrors : false,
      success : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit(event) {
    event.preventDefault();
    const {fname, lname, email} = this.state;

    axios.post('/user/change_data', {fname, lname, email})
      .then((response) => {
        this.setState ({
          message : response.data.message,
          hasErrors : false,
          success : true
        })
      })
      .catch((error) => {
        this.setState({
          message : error.response.data.message,
          hasErrors : true,
          success : false
        })
      })
  }
  printMessage = (hasErrors, message) => {
    if(hasErrors)
      if(message instanceof Object)
        return Object.keys(message).map(index => <div key={index}>{message[index].msg}</div>)
      else
        return <div>{message}</div>
    // no errors, but a message included most likely implies success
    else if(message.length > 0)
      return <div>{message}</div>
    else
      return ''
  }

  render() {
    const {fname, lname, email, message, hasErrors, success} = this.state;
    if(success)
      return <Redirect to={{
        pathname: '/login',
        state: { message: 'Your info has been changed! Please log in again' }
      }}/>
    return(
      <div style={oldOuterBox}>
        <Card style={oldCardStyle}>
          <CardHeader
            title="Update User Settings"
            actAsExpander={false}
            showExpandableButton={false}
          />
        <form onSubmit={this.onSubmit}>
        {this.printMessage(hasErrors, message)}

        <CardText style={flexColumn}>
          <div style={column}>
            <TextField
              hintText="First Name"
              name='fname'
              value={fname}
              onChange={this.onChange}
              /><br />
            <br />

            <TextField
              hintText="Last Name"
              name='lname'
              value={lname}
              onChange={this.onChange}
              /><br />
            <br />
          </div>

          <div style={column}>
            <TextField
              hintText="Email"
              name='email'
              value={email}
              onChange={this.onChange}
              /><br />
            <br />

            <TextField
              hintText="Address"
              disabled={true}
              /><br />
            <br />
          </div>
        </CardText>
        <RaisedButton type="submit" label="OK"  primary={true}/>
        </form>
        <br/>
        <CardActions >

          <Link to='/user/homepage'>
            <RaisedButton label="Cancel" primary={true} />
          </Link>
          <Link to="/user/password">
            <RaisedButton label="Change Password" secondary={true} />
          </Link>
          <Link to='/user/add_business'>
            <RaisedButton disabled={true} label="Add a business" secondary={true} />
          </Link>
        </CardActions>
        </Card>
      </div>
    );
  }
}

export default UserSettings;
