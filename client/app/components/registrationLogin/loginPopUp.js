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
      open: false,
      message : {},
      email : '',
      password : '',
      hasErrors : false,
      redirect : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
      return <Redirect to="/UserHomepage" />

    return (
      <div>
        <div>
          <RaisedButton
            label="Login"
            primary={true}
            onClick={this.handleOpen}
          />
          <RaisedButton
            label="extra"
            primary={true}
            onClick={this.handleOpen}
          />
        </div>

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >


          <div className={"LoginCard"}>
            <CardHeader
              className={"LoginCardHeader"}
              actAsExpander={true}
              showExpandableButton={false}
            >
              Sign In To Your POS Account
            </CardHeader>

            {this.printMessage(hasErrors, message)}

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

            <div className={"LoginCardFooter"}>

              <br /><br />
              Do you not have an account? Register now!
              <br /><br />
              <RegisterBusinessButton />
              <br />
              <RegisterEmployeeButton />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}


export class RegisterBusinessButton extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };
  render() {
    return (
      <div>
        <div>
          <Link to="/RegisterBusiness">
            <RaisedButton
              label="Register Business"
              onClick = {this.handleOpen}
            />
          </Link>
        </div>
        <div>
          <Route path="/RegisterBusiness" component={RegisterPopup} />
        </div>
      </div>
    )
  }
}


export class RegisterEmployeeButton extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };
  render() {
    return (
      <div>
        <div>
          <Link to="/RegisterEmployee">
            <RaisedButton
              label="Register Employee"
              onClick = {this.handleOpen}
            />
          </Link>
        </div>
        <div>
          <Route path="/RegisterEmployee" component={EmployeePopup} />
        </div>
      </div>
    )
  }
}
// ================================================
