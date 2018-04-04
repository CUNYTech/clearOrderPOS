import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from '../App.jsx';
import axios from 'axios';


class RegisterPopup extends Component {
  constructor(){
    super();
    this.state = {
      open: true,
      hasErrors : false,
      hasMultiple : false,
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
        const message = response.data.message;
        const hasErrors = false;
        this.setState ({message, hasErrors});
      })
      .catch((error) => {
        const message = error.response.data.message;
        const hasMultiple = (error.response.data.hasMultiple != null ? true : false);
        const hasErrors = true;
        console.log(message);
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
    const { fname, lname, email, business_name, business_phone, business_address, business_id, password, confirm_password, hasErrors, message, hasMultiple} = this.state;
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
            <div
              className={"LoginCardHeader"}
              actAsExpander={true}
              showExpandableButton={false}
            >
              Register Your Business
            </div>
            {hasErrors ?
                (hasMultiple ?
                    Object.keys(this.state.message).map((index)=>{
                        return <div key={index}>{this.state.message[index].msg}</div>})
                    : <div>{message}</div> )
                : (message.length > 0 ? <div>{message}</div> : '')}

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


export default RegisterPopup;
