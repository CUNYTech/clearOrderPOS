import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Link} from "react-router-dom";
import { aBarStyle } from '../../styles/cardStyle';
import MenuItem from 'material-ui/MenuItem';



export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <AppBar
          showMenuIconButton={false}
          title="Serve+"
          style={aBarStyle}
          iconElementRight={
            <Link to="/user/homepage">
              <MenuItem primaryText="My Homepage" style={{color: 'white'}} />
            </Link>}
        />
      </div>
    );
  }
}
