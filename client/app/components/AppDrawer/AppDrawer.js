import React, {Component} from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
//Material
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
//Misc
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Screen from '../extra/Screen';
import UserHomepage from '../UserHomepage/UserHomepage';
import Extra from '../extra/Extra';
import DashBoard from '../dashboard/dashboard';
//Login Related
import { LoginPopup, RegisterBusinessButton, RegisterEmployeeButton} from '../registrationLogin/loginPopUp';
import BusinessSettings from '../BusinessSettings/BusinessSettings';
import UserSettings from '../UserSettings/UserSettings';
import ChangePassword from '../UserSettings/ChangePassword';
import AddBusiness from '../UserSettings/AddBusiness';
import RegisterEmployee from '../registrationLogin/RegisterEmployee';
import RegisterBusiness from '../registrationLogin/RegisterBusiness';
import AppDrawerRoutes from './AppDrawerRoutes';

export default class AppDrawer extends Component {

  render() {
    return (
      <div className="appDrawer">
        <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <Link to='/home'> <MenuItem primaryText="Home" /> </Link>
        <Link to='/screen'> <MenuItem primaryText="Screen" /> </Link>
        <Link to="/login"> <MenuItem primaryText="Login" /> </Link>
        <Link to='/user/register'> <MenuItem primaryText="User Register" /> </Link>
        <Link to='/user/homepage'> <MenuItem primaryText="User Homepage" /> </Link>
        <Link to='/user/settings'> <MenuItem primaryText="User Settings" /> </Link>
        <Link to='/user/password'> <MenuItem primaryText="Change Password" /> </Link>
        <Link to='/business/register'> <MenuItem primaryText="Register Business" /> </Link>
        <Link to='/business/settings'> <MenuItem primaryText="Business Settings" /> </Link>
        <Link to='/extra'> <MenuItem primaryText="Extra" /> </Link>
        <Link to='/dashboard'> <MenuItem primaryText="Dashboard" /> </Link>
      </IconMenu>
    </div>
        );
      }
}
