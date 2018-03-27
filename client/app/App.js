import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Footer from './components/Footer/Footer.js';
import ForgotPasswordPopup from "./components/ForgotPassword";
import RegisterPopup from "./components/RegisterBusiness";
import EmployeePopup from "./components/RegisterEmployee";
import Home from './components/extra/Home';
import Screen from './components/extra/Screen'
import UserHomepage from "./components/UserHomepage/UserHomepage.js";
import BusinessSettings from "./components/BusinessSettings/BusinessSettings";
import UserSettings from './components/UserSettings/UserSettings';
import ChangePassword from './components/UserSettings/ChangePassword';
import AddBusiness from './components/UserSettings/AddBusiness';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div style={mainApp}>
        <header>
          <AppBar
            showMenuIconButton={false}
            title={<span>ModularPOS</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<LoginPopup />}
          />
        </header>

        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <Link to='/Home'> <MenuItem primaryText="Home" /> </Link>
          <Link to='/Screen'> <MenuItem primaryText="Screen" /> </Link>
          <Link to='/UserHomepage'> <MenuItem primaryText="UserHomepage" /> </Link>
          <Link to='/BusinessSettings'> <MenuItem primaryText="BusinessSettings" /> </Link>
          <Link to='/UserSettings'> <MenuItem primaryText="UserSettings" /> </Link>
          <Link to='/ChangePassword'> <MenuItem primaryText="ChangePassword" /> </Link>
          <Link to='/AddBusiness'> <MenuItem primaryText="AddBusiness" /> </Link>
        </IconMenu>

        <div>
          <Route path="/Home" component={Home} />
          <Route path="/Screen" component={Screen} />
          <Route path="/UserHomepage" component={UserHomepage} />
          <Route path="/BusinessSettings" component={BusinessSettings} />
          <Route path="/UserSettings" component={UserSettings} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/AddBusiness" component={AddBusiness} />
        </div>

        <Footer style={{position: 'absolute', bottom: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0}} />

      </div>
    );
  }
}

const mainApp = {
  height: '100%',
  maxHeight: '100%',
  overflow: 'auto',
}

class LoginPopup extends Component {

  state = {
    open: false,
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
            <div
              className={"LoginCardHeader"}
              actAsExpander={true}
              showExpandableButton={false}
            >
              Sign In To Your POS Account
            </div>

            <div>
              <TextField
                floatingLabelText="login_email"
                floatingLabelFixed={false}
                name='email'
              /><br />

              <TextField
                type={"password"}
                floatingLabelText="Password"
                floatingLabelFixed={false}
                name='login_password'
              /><br /><br />

              <RaisedButton label="Sign In" primary={true} />
            </div>

            <div className={"LoginCardFootter"}>

              <br /><br />
              Don't have an account? Register now!
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


class RegisterBusinessButton extends Component {
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


class RegisterEmployeeButton extends Component {
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


export default App;
