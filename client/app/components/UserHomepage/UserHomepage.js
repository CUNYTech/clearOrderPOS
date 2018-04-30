import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ReactDom from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import {Redirect} from 'react-router-dom'

import UserSettings from '../UserSettings/UserSettings';
import BusinessSettings from '../BusinessSettings/BusinessSettings';

import {oldOuterBox, oldCardStyle, flexColumn, column} from '../../styles/cardStyle';

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
      <div style={oldOuterBox} >
        <Card style={oldCardStyle}>
          <CardHeader
            title="User Homepage"
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
           >
         </CardHeader>

        <CardText style={flexColumn}>
          <div style={column}>
            <form onSubmit={this.onSubmit}>
            <h3>Business Name</h3>
            <DropDownMenu
              value={this.state.business}
              onChange={this.handleChange}
              autoWidth={true}
              >
                <MenuItem value={business} primaryText={business} />
              </DropDownMenu>
              <br /><br />
              <RaisedButton disabled={true} type="submit" label="Add" primary={true} />
            </form>
          </div>

          <div style={column}>
            <Link to='/user/settings' >
              <RaisedButton
                label='settings'
                secondary={true}
                />
            </Link>
          </div>
        </CardText>

        <CardActions >
          <Link to='/dashboard' >
            <RaisedButton
              label="GO"
              primary={true}
              />
          </Link>
          <Link to='/business/settings'>
              <RaisedButton
                label="Edit"
                secondary={true}
              />
          </Link>
        </CardActions>
      </Card>
      </div>
    );
  }
}

export default UserHomepage;
