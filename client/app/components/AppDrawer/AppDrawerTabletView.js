import React, {Component} from 'react';
import AppDrawer from './AppDrawer';
import InlineBlock from 'react-inline-block';
import Clock from '../clock/clock';

export default class AppDrawerTabletView extends Component {

  render () {
    return (
      <div style={{ backgroundColor: 'transparent'}}>
        <InlineBlock>
          <AppDrawer style={{}}/>
          </InlineBlock>
        <InlineBlock>
          <h1 style={{color: 'white', }}>Serve+</h1>
        </InlineBlock>
        <InlineBlock>
          <Clock />
        </InlineBlock>
      </div>
    );
  }
}
