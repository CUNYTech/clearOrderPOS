//React & Essentials
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Material
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
//Other
import WidgetsGrid from '../reactGridLayout/WidgetsGrid';

const dashboardStyle = {
  //display: 'flex', /* this makes it a column for some reason */
  backgroundColor: "#ff6f00",
  color: "white"
};


export default class dashBoard extends Component {

  render() {
    return (
      <div className="dash_mainGrid" >
        <Paper zDepth={5} style={dashboardStyle} rounded={true}>
          <h1 style={dashboardStyle}> Dashboard </h1>
        </Paper>
        <Paper zDepth={5} style={dashboardStyle} rounded={true}>
            <WidgetsGrid />
        </Paper>
      </div>
    );
  }
}
