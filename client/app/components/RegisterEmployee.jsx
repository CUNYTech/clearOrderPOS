import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from '../App.jsx';
import axios from 'axios';


class EmployeePopup extends Component {
    constructor()
    {
        super();
        this.state = {
            open: true,
            hasErrors : false,
            hasMultiple : false,
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
                const message = response.data.message;
                const hasErrors = false;
                const redirect = true;
                this.setState ({message, hasErrors, redirect});
            })
            .catch((error) => {
                const message = error.response.data.message;
                const hasMultiple = (error.response.data.hasMultiple != null ? true : false);
                const hasErrors = true;
                this.setState({message, hasErrors, hasMultiple});
            })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fname, lname, email, business_id, password, confirm_password, message, redirect, hasErrors, hasMultiple} = this.state;
        if(redirect)
            return (<Redirect to={{pathname : '/UserHomepage', state : {message : message}}} />)
        return (
            <div>
                <RaisedButton
                    className={"LoginButton"}
                    primary={true}
                    label="Register Business"
                    onClick={this.handleOpen}

                />

                <Dialog
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >


                    <div className={"LoginCard"}>
                        <div
                            className={"LoginCardHeader"}
                            actAsExpander={true}
                            showExpandableButton={false}
                        >
                            Employee Registration
                        </div>
                        {hasErrors ?
                            (hasMultiple ?
                                Object.keys(this.state.message).map((index)=>{
                                    return <div key={index}>{this.state.message[index].msg}</div>})
                                : <div>{message}</div> )
                            : ''}

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

                        <div className={"LoginCardFootter"}>
                            <br />
                            <Link to="../App">
                                <RaisedButton
                                    label="Back"
                                    onClick={this.handleClose} />
                            </Link>
                        </div>

                        <div>
                            <Route path="/App.js" component={LoginPopup} />

                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default EmployeePopup;
