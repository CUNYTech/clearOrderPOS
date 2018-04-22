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
      redirect : false,
      businesses : '',
      business : ''
    };
  }
  

  componentWillMount(){
    axios.get('/business/get-businesses')
      .then((response) => {
        this.setState({
          businesses : response.data.business_id ,
          business : response.data.business_id
        })
      })
      .catch((error) => {
      })
  }

  onDropMenuChange = (event, index, value) => this.setState({value});

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const {redirect, businesses, business} = this.state;
    if(redirect === true)
      return <Redirect to="/" />
    return (
      <div className='outer-box' >

        <h1 className='center-me'>User Homepage</h1>
        <br />
        <div className='middle-box'>
          <div className='settings-box'>
            <Link to='/user/settings' >
              <RaisedButton
                label='Edit My Information'
                secondary={true}
                />
            </Link>
          </div>
          <div className='business-box'>
          <form onSubmit={this.onSubmit}>
              <h1>Pick a Business</h1>
              <DropDownMenu
              value={this.state.business}
              onChange={this.onDropMenuChange}
              autoWidth={true}
              >
                <MenuItem value={business} primaryText={businesses} />
              </DropDownMenu>
              <br /><br />
              <RaisedButton disabled={true} type="submit" label="Add" primary={true} />
            </form>
          </div>

        </div>

        <div >

          <div className='button-box'>
            <Link to='/screen'>
              <RaisedButton
                className='float-right'
                label="GO"
                primary={true}
              />
            </Link>
          </div>

          <div className='button-box' >
            <Link to='/business/settings'>
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
