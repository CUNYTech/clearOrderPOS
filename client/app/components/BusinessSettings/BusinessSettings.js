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

          <div style={pane}>
            <h1>L L L</h1>
            <Bleft />
          </div>

          <div style={pane}>
            <h1>middle info</h1>
            <Bmid />
          </div>

          <div style={pane}>
            <h1>R R R</h1>
            <Bright />
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

const pane = {
  alignItems: 'center',
  textAlign: 'center',
  float: 'left',
  height: '100%',
  minHeight: '500px',
  width: '33%',
  overflow: 'auto',
}
