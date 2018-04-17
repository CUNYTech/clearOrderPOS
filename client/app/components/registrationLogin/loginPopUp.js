import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom'

//Material
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardHeader} from 'material-ui/Card';

//Custom Components
import EmployeePopup from "./RegisterEmployee";
import RegisterPopup from "./RegisterBusiness";
import UserHomepage from "../UserHomepage/UserHomepage";

export class LoginPopup extends Component {
  constructor(){
    super();
    this.state = {
      message : {},
      email : '',
      password : '',
      hasErrors : false,
      redirect : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit(event) {
    event.preventDefault();
    const {email, password, redirect} = this.state;

    axios.post('/user/login', { email, password })
        .then((response) => {
            this.setState({
              message : response.data.message,
              redirect : true,
              hasErrors : false
            });
        })
        .catch((error) => {
          this.setState({
            message : error.response.data.message,
            hasErrors : true,
            redirect : false
          });
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
    const {message, email, password, hasErrors, redirect} = this.state;
    if(redirect)
      return <Redirect to="/user/homepage" />

    return (
      <div style={outerBox}>
        <Card style={cardStyle}>
          <CardHeader
            title="Serve+ Login"
            actAsExpander={true}
            showExpandableButton={false}
          />

          {this.printMessage(hasErrors, message)}

          <div >
            <form onSubmit={this.onSubmit}>
              <TextField
                floatingLabelText="Email"
                floatingLabelFixed={false}
                name='email'
                value={email}
                onChange={this.onChange}
              /><br />

              <TextField
                type={"password"}
                floatingLabelText="Password"
                floatingLabelFixed={false}
                name='password'
                value={password}
                onChange={this.onChange}
              /><br /><br />

              <RaisedButton type="submit" label="Sign In" primary={true} />
            </form>
          </div>

          <div className={"LoginCardFooter"}>

            <br /><br />
            Don't have an account? Register Now!
            <br /><br />
            <Link to="/business/register">
              <RaisedButton
                label="Register Business"
              />
            </Link>
            <br />
            <Link to="/user/register">
              <RaisedButton
                label="Register Account"
              />
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}
// ================================================



const outerBox = {
  margin: 'auto',
  width: '75%',
  height: '90%',
  padding: '20px',
  overflow: 'auto',
};

const cardStyle = {
  height: '100%',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: 'beige',
}
