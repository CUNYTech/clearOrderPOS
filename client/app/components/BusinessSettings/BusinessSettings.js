import React, {Component} from 'react';
import ReactDom from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Bleft from './Bleft.js';
import Bmid from './Bmid.js';
import Bright from './Bright.js';

class BusinessSettings extends Component {
  render() {
    return (
      <div>

        <div style={outside}>

          <div style={listingPane}>
            <Bleft />
          </div>

          <div style={settingsPane}>
            <Bmid />
          </div>

        </div>

      </div>
    );
  }
}

export default BusinessSettings;

const outside = {
  boxSizing: 'border-box',
  overflow: 'auto',
  width: '100%',
  margin: 'auto',
  padding: '10px',
  overflow: 'auto',
}

const listingPane = {
  alignItems: 'center',
  textAlign: 'center',
  float: 'left',
  height: '100%',
  minHeight: '500px',
  width: '50%',
  marginRight: '10px',
  overflow: 'auto',
}

const settingsPane = {
  alignItems: 'center',
  textAlign: 'center',
  float: 'left',
  height: '100%',
  minHeight: '500px',
  marginLeft: '15px',
  width: '30%',
  overflow: 'auto',
}
