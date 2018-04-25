//React & Essentials
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Material
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
//Other
import WidgetsGrid from '../reactGridLayout/WidgetsGrid';

const dashboardStyle = {
  backgroundColor: 'darkOrange',
  color:'white',
}

const mainGrid = {
  boxSizing: 'border-box',
  border: '5px solid white',
  borderRadius: '15px',
  width: '98%',
  height: '98%',
  overflow: 'auto',
}


export default class dashBoard extends Component {

  render() {
    return (
      <div style={mainGrid} >
        <Paper zDepth={5} style={dashboardStyle} rounded={true}>
            <WidgetsGrid />
        </Paper>
      </div>
    );
  }
}
