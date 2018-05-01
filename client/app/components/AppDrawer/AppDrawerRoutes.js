import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
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

export default class AppDrawerRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/screen" component={Screen} />
        <Route path="/login" component={LoginPopup} />
        <Route path="/user/register" component={RegisterEmployee} />
        <Route path="/user/homepage" component={UserHomepage} />
        <Route path="/user/settings" component={UserSettings} />
        <Route path="/user/password" component={ChangePassword} />
        <Route path="/user/add_business" component={AddBusiness} />
        <Route path="/business/register" component={RegisterBusiness} />
        <Route path="/business/settings" component={BusinessSettings} />
        <Route path="/extra" component={Extra} />
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    );
  }
}

/*
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/screen" component={Screen} />
  <Route path="/login" component={LoginPopup} />

  <Route path="/user/register" component={RegisterEmployee} />
  <Route path="/user/homepage" component={UserHomepage} />
  <Route path="/user/settings" component={UserSettings} />
  <Route path="/user/password" component={ChangePassword} />
  <Route path="/user/add_business" component={AddBusiness} />

  <Route path="/business/register" component={RegisterBusiness} />
  <Route path="/business/settings" component={BusinessSettings} />

  <Route path="/extra" component={Extra} />
  <Route path="/dashboard" component={DashBoard} />
</Switch>
*/
