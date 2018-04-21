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
import Home from '../extra/Home';

import {outerBox, cardStyle, flexColumn, column} from '../../styles/cardStyle';

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
      <div style={outerBox} >
        <Card style={cardStyle}>
          <CardHeader
            title="User Homepage"
            subtitle=""
            aactAsExpander={false}
            showExpandableButton={false}
           >
         </CardHeader>

        <CardText style={flexColumn}>
          <div style={column}>
            <h3>Business Name</h3>
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
          <Link to='/home' >
            <RaisedButton
              label="HOME"
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
