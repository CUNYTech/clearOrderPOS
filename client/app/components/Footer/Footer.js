import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Clock from '../clock/clock';

const recentsIcon = <FontIcon className="material-icons">A</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">B</FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <div style={outerBox}>
        <AppBar
          showMenuIconButton={false}
          style={{border: '0px solid transparent', borderRadius: '15px'}}
          iconElementRight={<Clock />}
        />
      </div>
    );
  }
}

const outerBox = {
  margin: 'auto',
  width: '100%',
  height: '100%',
  padding: '0px',
  overflow: 'auto',
};

const bar = {
  border: '1px solid gray'
}
