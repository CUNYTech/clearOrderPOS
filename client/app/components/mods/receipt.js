import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {receiptStyle} from '../../styles/cardStyle';

export default class Receipt extends Component {
  render() {
    return (
      <Card style={receiptStyle} >
        <h1>Receipt</h1>
      </Card>
    );
  }
}
