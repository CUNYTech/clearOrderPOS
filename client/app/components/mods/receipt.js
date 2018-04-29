import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {receiptStyle, receiptHeader, receiptBody, receiptFooter} from '../../styles/cardStyle';

export default class Receipt extends Component {
  render() {
    return (
      <Card style={receiptStyle} >
        <CardText style={receiptHeader}>
          <h1>RECEIPT</h1>
          <div>
            <h4 style={{float: 'left'}}>Current table: 3</h4>
          </div>
          <div style={{float: 'right'}}>
            <h4>table status: open</h4>
          </div>
        </CardText>

        <div style={receiptBody}>
          <CardText >
            <div style={{float: 'left'}}>
              <h4>Pizza</h4>
              <h4>Burger</h4>
              <h4>Fries</h4>
              <h4>Sprite</h4>
              <h4>Chips</h4>
            </div>
            <div style={{float: 'right'}}>
              <h4>3.00</h4>
              <h4>7.50</h4>
              <h4>2.00</h4>
              <h4>1.50</h4>
              <h4>1.00</h4>
            </div>
          </CardText>
        </div>
        <div style={receiptFooter}>
          <CardText>
            <div style={{float: 'left'}}>
              <h4>Total</h4>
            </div>
            <div style={{float: 'right'}}>
              <h4>25.00</h4>
            </div>
          </CardText>
        </div>
      </Card>
    );
  }
}
