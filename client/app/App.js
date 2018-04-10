import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
//Misc
import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/extra/Home';
import Screen from './components/extra/Screen'
import UserHomepage from './components/UserHomepage/UserHomepage';
import BasicLayout from './components/reactGridLayout/widgetGrid';

//Login Related
import { LoginPopup, RegisterBusinessButton, RegisterEmployeeButton} from './components/registrationLogin/loginPopUp';
import BusinessSettings from "./components/BusinessSettings/BusinessSettings";
import UserSettings from './components/UserSettings/UserSettings';
import ChangePassword from './components/UserSettings/ChangePassword';
import AddBusiness from './components/UserSettings/AddBusiness';
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
  render() {
    return (
      <div style={mainApp}>
        <header>
          <AppBar
            showMenuIconButton={false}
            title={<span>Serve+</span>}
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

        <BasicLayout />
        
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

export default App;
