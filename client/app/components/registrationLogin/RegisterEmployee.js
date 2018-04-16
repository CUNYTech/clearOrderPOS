import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from './loginPopUp';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';


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
            <div>
                <div className={"LoginCard"}>
                    <CardHeader
                        className={"LoginCardHeader"}
                        actAsExpander={true}
                        showExpandableButton={false}
                    >
                        Employee Registration
                    </CardHeader>

                    {this.printMessage(hasErrors, message)}

                    <form onSubmit={this.onSubmit}>
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

                        <RaisedButton type="submit" label="Register" primary={true} />
                    </form>

                    <div className={"LoginCardFooter"}>
                        <br />
                        <Link to="/business/register">
                            <RaisedButton
                                label="Registering a business?"
                                onClick={this.handleClose} />
                        </Link>
                    </div>

                    <div>
                        <Route path=".../App.js" component={LoginPopup} />

                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeePopup;
