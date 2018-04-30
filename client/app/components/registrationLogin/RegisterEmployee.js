import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from './loginPopUp';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {oldOuterBox, oldCardStyle, flexColumn, column} from '../../styles/cardStyle';


class EmployeePopup extends Component {
    constructor()
    {
        super();
        this.state = {
            hasErrors : false,
            redirect : false,
            message : {},
            fname : '',
            lname : '',
            email : '',
            business_id : '',
            password : '',
            confirm_password : ''
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
        const {fname, lname, email, business_id, password, confirm_password, message} = this.state;

        axios.post('/user/register', { fname, lname, email, business_id, password, confirm_password })
            .then((response) => {
                this.setState ({
                    message : response.data.message,
                    hasErrors : false,
                    redirect : true});
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
        const { fname, lname, email, business_id, password, confirm_password, message, redirect, hasErrors} = this.state;
        if(redirect)
            return <Redirect to='/user/homepage' />
        return (
            <div style={oldOuterBox}>
              <Card style={oldCardStyle}>
                <CardHeader
                  title="Employee Registration"
                    actAsExpander={true}
                    showExpandableButton={false}
                />

                {this.printMessage(hasErrors, message)}

                <form onSubmit={this.onSubmit}>
                  <CardText style={flexColumn}>
                    <div style={column}>
                      <TextField
                          floatingLabelText="First Name"
                          floatingLabelFixed={false}
                          name='fname'
                          value={fname}
                          onChange={this.onChange}
                      /><br />

                      <TextField
                          floatingLabelText="Last Name"
                          floatingLabelFixed={false}
                          name='lname'
                          value={lname}
                          onChange={this.onChange}
                      /><br />

                      <TextField
                          floatingLabelText="Company ID or Company Name"
                          floatingLabelFixed={false}
                          name='business_id'
                          value={business_id}
                          onChange={this.onChange}
                      /><br />
                    </div>

                    <div style={column}>
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
                        /><br />

                        <TextField
                            type={"password"}
                            floatingLabelText="Confirm Password"
                            floatingLabelFixed={false}
                            name='confirm_password'
                            value={confirm_password}
                            onChange={this.onChange}
                        /><br />
                    </div>
                  </CardText>

                  <CardActions>
                    <RaisedButton type="submit" label="Register" primary={true} />
                    <Link to="/business/register">
                        <RaisedButton
                            label="Registering a business?"
                            secondary={true}
                            onClick={this.handleClose} />
                    </Link>
                  </CardActions>
                </form>

                <div>
                    <Route path=".../App.js" component={LoginPopup} />
                </div>
              </Card>
            </div>
        )
    }
}

export default EmployeePopup;
