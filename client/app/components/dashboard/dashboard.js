//React & Essentials
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Material
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
//Other
import WidgetsGrid from '../reactGridLayout/WidgetsGrid';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Receipt from '../mods/receipt';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const dashboardStyle = {
  backgroundColor: 'darkOrange',
  color:'white',
}

const pos = {
  boxSizing: 'border-box',
  border: '5px solid white',
  borderRadius: '15px',
  margin: '0px',
  padding: '0px',
  width: '100%',
  height: '100%',
  height: '100vh',
  maxHeight: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
  overflow: 'none',
}

const receipt = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  padding: '5px',
  margin: '0px',
  textAlign: 'center',
  width: '30%',
  minWidth: '30%',
  maxWidth: '30%',
  overflow: 'auto',
}

const mods = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  padding: '0px',
  margin: '0px',
  textAlign: 'center',
  width: '70%',
  minWidth: '70%',
  maxWidth: '70%',
  overflow: 'auto',
}


export default class dashBoard extends Component {

  render() {
    return (
      <div style={pos} >
        <div style={receipt}>
          <Receipt />
        </div>
        <div style={mods}>
          <ResponsiveReactGridLayout
            className="wid_Grid"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            <div key="wid_grid" data-grid={{x: 5, y: 0, w:12, h: 5, maxH: 7, static: true}}>
              <Paper zDepth={5} style={dashboardStyle} rounded={true}>
                  <WidgetsGrid />
              </Paper>
            </div>
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}
