import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import LoginPopup from '../App';


class ForgotPasswordPopup extends Component {

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


        <Dialog
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >


          <div className={"LoginCard"}>
            <div
              className={"LoginCardHeader"}
              actAsExpander={true}
              showExpandableButton={false}
            >
              Recover Password
            </div>

            <div>
              
              <TextField
                floatingLabelText="Email"
                floatingLabelFixed={false}
              /><br />

              <RaisedButton label="Recover" primary={true} />
            </div>


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


export default ForgotPasswordPopup;