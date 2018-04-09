import React, {Component} from 'react';
import ReactDom from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import {Redirect} from 'react-router-dom'

import UserSettings from '../UserSettings/UserSettings';
import BusinessSettings from '../BusinessSettings/BusinessSettings';

import './UserHomepage.css';

class UserHomepage extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      redirect : false
    };
  }

  componentDidMount(){
    axios.get('/user-auth')
      .then((response) => {
        this.setState({redirect : false});
      })
      .catch((error) => {
        this.setState({redirect : true});
      })
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const redirect = this.state;
    if(redirect === true)
      return <Redirect to="/" />
    return (
      <div className='outer-box' >

        <h1 className='center-me'>User Homepage</h1>
        <br />

        <div className='middle-box'>

          <div className='settings-box'>
            <Link to='/UserSettings' >
              <RaisedButton
                label='settings'
                secondary={true}
                />
            </Link>
          </div>

          <div className='business-box'>
            <h3>Business Name </h3>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              autoWidth={true}
            >
              <MenuItem value={1} primaryText="select a business" />
              <MenuItem value={2} primaryText="Business I" />
              <MenuItem value={3} primaryText="Business II" />
              <MenuItem value={4} primaryText="Business III" />
              <MenuItem value={5} primaryText="Business III " />
            </DropDownMenu>
          </div>

        </div>

        <div >

          <div className='button-box'>
            <RaisedButton
              className='float-right'
              label="GO"
              primary={true}
              />
          </div>

          <div className='button-box' >
            <Link to='BusinessSettings'>
              <RaisedButton
                className='float-left'
                label="Edit"
                secondary={true}
              />
          </Link>
          </div>

        </div>

        <div>
          <Route path="/UserSettings" component={UserSettings} />
          <Route path='BusinessSettings' component={BusinessSettings} />
        </div>

      </div>
    );
  }
}

export default UserHomepage;
