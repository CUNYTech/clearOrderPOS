import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

import UserSettings from './UserSettings';
import Axios from 'axios';
import {oldOuterBox, oldCardStyle} from '../../styles/cardStyle';

export default class ChangePassword extends Component {

  constructor(){
    super();
    this.state = {
      old_password : '',
      new_password : '',
      confirm_password : '',
      hasErrors : false,
      message : {}
    };
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit = (event) => {
    const {old_password, new_password, confirm_password} = this.state;
    event.preventDefault();

    Axios.post('/user/change_password', {old_password, new_password, confirm_password})
      .then((response) =>{
        console.log(response);
        this.setState({
          message : response.data.message,
          hasErrors : false
        })
      })
      .catch((error) => {
        this.setState({
          hasErrors : true,
          message : error.response.data.message
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
    const {old_password, new_password, confirm_password, hasErrors, message } = this.state;
    return (
      <div style={oldOuterBox}>
        <Card style={oldCardStyle}>
          <CardHeader
            title="Change Password"
            actAsExpander={false}
            showExpandableButton={false}
          />
          {this.printMessage(hasErrors, message)}
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                floatingLabelText="Old Password"
                type={"password"}
                floatingLabelFixed={true}
                name="old_password"
                value={old_password}
                onChange={this.onChange}
              />
              <br /> <br />

              <TextField
                floatingLabelText="New Password"
                type={"password"}
                floatingLabelFixed={true}
                name="new_password"
                value={new_password}
                onChange={this.onChange}
              />
              <br /> <br />

              <TextField
                floatingLabelText="Confirm Password"
                type={"password"}
                floatingLabelFixed={true}
                name="confirm_password"
                value={confirm_password}
                onChange={this.onChange}
              />
              <br /> <br />
            </div>
            <RaisedButton type="submit" label="Confirm"  primary={true}/>

            <CardActions>
            <Link to='/user/settings' >
              <RaisedButton label="Cancel" secondary={true} />
            </Link>
          </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}
