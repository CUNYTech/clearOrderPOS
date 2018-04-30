import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom'

//Material
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

//Custom Components
import EmployeePopup from "./RegisterEmployee";
import RegisterPopup from "./RegisterBusiness";
import UserHomepage from "../UserHomepage/UserHomepage";

import {oldOuterBox, oldCardStyle} from '../../styles/cardStyle';

export class LoginPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
      message : {},
      email : '',
      password : '',
      hasErrors : false,
      redirect : false,
      expanded: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
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
    if(typeof this.props.location.state !== "undefined")
      return <div>{this.props.location.state.message}</div>
    else if(hasErrors)
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
      <div style={oldOuterBox}>
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          style={oldCardStyle}
          >
          <CardHeader
            title="Serve+ Login"
            actAsExpander={false}
            showExpandableButton={false}
          />

          {this.printMessage(hasErrors, message)}

          <form onSubmit={this.onSubmit}>
            <CardText>
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
            </CardText>

            <CardActions>
              <RaisedButton type="submit" label="Sign In" primary={true} />
            </CardActions>
          </form>

          <CardText actAsExpander={true}>
            <h3>
              Don't have an account? Click Here!
            </h3>
          </CardText>

          <CardActions expandable={true}>
            <Link to="/business/register">
              <RaisedButton
                label="Register Business"
                secondary={true}
                />
            </Link>
            <Link to="/user/register">
              <RaisedButton
                label="Register Account"
                secondary={true}
                />
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}
// ================================================
