import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

//stylesheet
import './App.css';

//Misc
import Footer from './components/Footer/Footer';
import Home from './components/extra/Home';
import Screen from './components/extra/Screen'
import UserHomepage from './components/UserHomepage/UserHomepage';
import BasicLayout from './components/reactGridLayout/widgetGrid';
import WidgetsGrid from './components/reactGridLayout/WidgetsGrid';
import Extra from './components/extra/Extra.js';

//Login Related
import { LoginPopup, RegisterBusinessButton, RegisterEmployeeButton} from './components/registrationLogin/loginPopUp';
import BusinessSettings from "./components/BusinessSettings/BusinessSettings";
import UserSettings from './components/UserSettings/UserSettings';
import ChangePassword from './components/UserSettings/ChangePassword';
import AddBusiness from './components/UserSettings/AddBusiness';
import RegisterEmployee from './components/registrationLogin/RegisterEmployee';
import RegisterBusiness from './components/registrationLogin/RegisterBusiness';

//Material
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
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

class App extends Component {

  state = {
    isAuth : false
  }

  componentDidMount() {
    // axios.post('/user-auth', { })
    // .then((response) => {
    //   this.setState({
    //     isAuth : true
    //   })
    // })
    // .catch((error) => {
    //   this.setState({
    //     isAuth : false
    //   })
    // })
  }

  render() {

    const isAuth = this.state;

    return (
      <div className="app">
        <div className="header">
          <AppBar
            showMenuIconButton={false}
            title={<span>Serve+</span>}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}

            iconElementRight={<Link to="/user/homepage"> <MenuItem primaryText="My Homepage" /> </Link>}
          />
        </div>

        <div className="main">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <Link to='/home'> <MenuItem primaryText="Home" /> </Link>
            <Link to='/screen'> <MenuItem primaryText="Screen" /> </Link>
            <Link to="/login"> <MenuItem primaryText="Login" /> </Link>

            <Link to='/user/homepage'> <MenuItem primaryText="User Homepage" /> </Link>
            <Link to='/user/settings'> <MenuItem primaryText="User Settings" /> </Link>
            <Link to='/user/password'> <MenuItem primaryText="Change Password" /> </Link>
            <Link to='/user/register'> <MenuItem primaryText="User Register" /> </Link>

            <Link to='/business/register'> <MenuItem primaryText="Register Business" /> </Link>
            <Link to='/business/settings'> <MenuItem primaryText="Business Settings" /> </Link>

            <Link to='/extra'> <MenuItem primaryText="Extra" /> </Link>
          </IconMenu>

          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/screen" component={Screen} />
            <Route path="/login" component={LoginPopup} />

            <Route path="/user/homepage" component={UserHomepage} />
            <Route path="/user/settings" component={UserSettings} />
            <Route path="/user/password" component={ChangePassword} />
            <Route path="/user/register" component={RegisterEmployee} />

            <Route path="/business/register" component={RegisterBusiness} />
            <Route path="/business/settings" component={BusinessSettings} />

            <Route path="/extra" component={Extra} />
          </Switch>
        </div>
        <WidgetsGrid />
        <div className="footer">
          <Footer />
        </div>

      </div>
    );
  }
}

export default App;

const mainApp = {
  height: '100%',
  maxHeight: '100%',
  overflow: 'auto',
}
