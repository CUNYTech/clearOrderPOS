import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

//stylesheet
import './App.css';

//Misc
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Screen from './components/extra/Screen';
import UserHomepage from './components/UserHomepage/UserHomepage';
import Extra from './components/extra/Extra.js';
import dashBoard from './components/dashboard/dashboard';

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


import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991}/>;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;


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
    /*
      <Mobile>
        { (matches) => {
          if(matches) {return null;}
          else { return <div className="footer"> <Footer /> </div>; }
        }}
      </Mobile>
      <Default>
        { (matches) => {
          if(matches) { return
              <div>
                <AppBar
                  showMenuIconButton={false}
                  title="Serve+"
                  style={aBarStyle}
                  iconElementRight={
                    <Link to="/user/homepage">
                      <MenuItem primaryText="My Homepage" style={{color: 'white'}} />
                    </Link>}
                />
            </div>;
          } else { return <h3>NOT Default</h3>; }
          }
        }
      </Default>
    */
  }

  render() {

    const isAuth = this.state;

    return (

      <div className="app">
        {/* If on a phone, do not render footer and header */}
        <Default>
          { (matches) => {
            if(matches) {return <Header />;}
            else { return null; }
          }}
        </Default>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/screen" component={Screen} />
            <Route path="/login" component={LoginPopup} />

            <Route path="/user/register" component={RegisterEmployee}/>
            <Route path="/user/homepage" component={UserHomepage} />
            <Route path="/user/settings" component={UserSettings} />
            <Route path="/user/password" component={ChangePassword}/>
            <Route path="/user/add_business" component={AddBusiness}/>

            <Route path="/business/register" component={RegisterBusiness} />
            <Route path="/business/settings" component={BusinessSettings} />

            <Route path="/extra" component={Extra} />
            <Route path="/dashboard" component={dashBoard} />
          </Switch>
        </div>
        <Default>
        { (matches) => {
          if(matches) { return <Footer />; }
          else { return null; }
        }}
        </Default>
      </div>
    );
  }
}

export default App;
