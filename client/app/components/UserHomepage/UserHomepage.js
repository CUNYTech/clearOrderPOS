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
      <div >
        <Card style={outside}>
          <CardHeader
            title=""
            subtitle=""
            actAsExpander={false}
            showExpandableButton={false}
           >
           <div style={heading}>
             User Homepage
           </div>
         </CardHeader>

        <div style={middleBox}>

          <div style={right}>
            <Link to='/user/settings' >
              <RaisedButton
                label='settings'
                secondary={true}
                />
            </Link>
          </div>

          <div style={left}>
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

          <div style={buttonBox}>
            <RaisedButton
              style={right}
              label="GO"
              primary={true}
              />
          </div>

          <div style={buttonBox} >
            <Link to='business/settings'>
              <RaisedButton
                style={left}
                label="Edit"
                secondary={true}
              />
          </Link>
          </div>

        </div>

        <div>
          <Route path="/user/settings" component={UserSettings} />
          <Route path='business/settings' component={BusinessSettings} />
        </div>
      </Card>

      </div>
    );
  }
}

export default UserHomepage;

const outside = {
  margin: 'auto',
  width: '75%',
  overflow: 'auto',
  boxSizing: 'border-box',
  padding: '20px',
}
const heading = {
  textAlign: 'center',
  fontSize: '40px',
}

const middleBox = {
  height: '200px',
  margin: 'auto',
  width: '60%',
}

const left = {
  float: 'left',
  margin: 'auto',
}

const right = {
  float: 'right',
  margin: 'auto',
}

const buttonBox = {
  float: 'left',
  padding: '20px',
  width: '50%',
}
