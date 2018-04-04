import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import Footer from './components/Footer/Footer.jsx';
import ForgotPasswordPopup from './components/ForgotPassword.jsx';
import RegisterPopup from './components/RegisterBusiness.jsx';
import EmployeePopup from './components/RegisterEmployee.jsx';
import Home from './components/extra/Home.jsx';
import Screen from './components/extra/Screen.jsx'
import UserHomepage from './components/UserHomepage/UserHomepage.jsx';
import BusinessSettings from './components/BusinessSettings/BusinessSettings.jsx';
import UserSettings from './components/UserSettings/UserSettings.jsx';
import ChangePassword from './components/UserSettings/ChangePassword.jsx';
import AddBusiness from './components/UserSettings/AddBusiness.jsx';
import { Redirect, Switch } from 'react-router-dom';

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

        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/Screen" component={Screen} />
          <Route path="/UserHomepage" component={UserHomepage} />
          <Route path="/BusinessSettings" component={BusinessSettings} />
          <Route path="/UserSettings" component={UserSettings} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/AddBusiness" component={AddBusiness} />
        </Switch>

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
  constructor(){
    super();
    this.state = {
      open: false,
      message : '',
      email : '',
      password : '',
      hasMultiple : false,
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
            const message = response.message;
            const redirect = true;
            this.setState ({message, redirect});
        })
        .catch((error) => {
          console.log(error.response);
          const message = error.response.data.message;
          const hasMultiple = (error.response.data.hasMultiple != null ? true : false);
          this.setState({message, hasMultiple});
        })
  }

  render() {
    const {message, email, password, hasMultiple, redirect} = this.state;
    if(redirect)
    {
      return <Redirect from="/" to="/UserHomepage" />
    }
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
            {hasMultiple ?
                    Object.keys(this.state.message).map((index)=>{
                        return <div key={index}>{this.state.message[index].msg}</div>})
                    : <div>{message}</div>  }
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
