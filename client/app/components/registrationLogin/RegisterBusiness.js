import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from './loginPopUp';
import axios from 'axios';
import {Card, CardHeader} from 'material-ui/Card';


class RegisterPopup extends Component {
  constructor(){
    super();
    this.state = {
      open: true,
      hasErrors : false,
      message : {},
      fname : '',
      lname : '',
      email : '',
      business_id : '',
      business_name : '',
      business_phone : '',
      business_address : '',
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
    const {fname, lname, email, business_name, business_phone, business_address, business_id, password, confirm_password, message} = this.state;

    axios.post('/business/register', { fname, lname, email, business_name, business_phone, business_address, business_id, password, confirm_password })
      .then((response) => {
        this.setState ({
          message : response.data.message, 
          hasErrors : false });
      })
      .catch((error) => {
        this.setState({
          message : error.response.data.message,
          hasErrors : true});
      })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  printMessage = (hasErrors, message) => {
    if(hasErrors)
      if(message instanceof Object)
        return Object.keys(message).map(index => <div key={index}>{message[index].msg}</div>)
      else
        return <div>{message}</div>
    else if(message.length > 0)
      return <div>{message}</div>
    else
      return <div>''</div>
  }

  render() {
    const { fname, lname, email, business_name, business_phone, business_address, business_id, password, confirm_password, hasErrors, message} = this.state;
    return (
      <div>
        <RaisedButton
              label="Register Business"
              onClick = {this.handleOpen}
            />
        <RaisedButton label="Scrollable Dialog" onClick={this.handleOpen} />
        <Dialog
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >

          <div className={"LoginCard"}>
            <CardHeader
              className={"LoginCardHeader"}
              actAsExpander={true}
              showExpandableButton={false}
            >
              Register Your Business
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
                  floatingLabelText="Business Name"
                  floatingLabelFixed={false}
                  name='business_name'
                  value={business_name}
                  onChange={this.onChange}
              /><br />

               <TextField
                  floatingLabelText="Business Phone Number"
                  floatingLabelFixed={false}
                  name='business_phone'
                  value={business_phone}
                  onChange={this.onChange}
              /><br />

              <TextField
                  floatingLabelText="Business Address"
                  floatingLabelFixed={false}
                  name='business_address'
                  value={business_address}
                  onChange={this.onChange}
              /><br />

              <TextField
                  floatingLabelText="Business Code"
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
              <Link to=".../App">
                <RaisedButton
                  label="Back"
                  onClick={this.handleClose} />
              </Link>
            </div>
            <div>
              <Route path=".../App.js" component={LoginPopup} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}


export default RegisterPopup;
