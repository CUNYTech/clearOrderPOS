import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from '../App';


class RegisterPopup extends Component {

  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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

            <form action="/business/register" method="POST">
              <TextField
                floatingLabelText="First Name"
                floatingLabelFixed={false}
                name='fname'
              /><br />

              <TextField
                floatingLabelText="Last Name"
                floatingLabelFixed={false}
                name='lname'
              /><br />

              <TextField
                floatingLabelText="Legal Business Name"
                floatingLabelFixed={false}
                name='business_name'
              /><br />

              <TextField
                floatingLabelText="Legal Business Email"
                floatingLabelFixed={false}
                name='business_email'
              /><br />

              <TextField
                type={"password"}
                floatingLabelText="Password"
                floatingLabelFixed={false}
                name='password'
              /><br />

              <TextField
                type={"password"}
                floatingLabelText="Confirm Password"
                floatingLabelFixed={false}
                name='confirm_passowrd'
              /><br />

              <RaisedButton label="Register" primary={true} />
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
