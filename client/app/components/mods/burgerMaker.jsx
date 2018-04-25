import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import { outerBox, cardStyle } from '../../styles/cardStyle';

const column = {
  float: 'left',
  width: '24%',
};

const dividePad = {
  marginTop: 5,
  marginBottom: 5,
  padding: 2,
  backgroundColor: 'blue',
};

export default class PizzaMaker extends Component {
  render() {
    return (
      <div style={outerBox} >
        <Card style={cardStyle}>
          <CardHeader
            title="Burger Maker"
            subtitle="select from the options below"
            actAsExpander={false}
            showExpandableButton={false}
          />
        <CardActions>
          <div style={column}>
            <h3>BUN</h3>
            <RaisedButton
              label='small'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='large'
              secondary={true}
              />
          </div>
          <div style={column}>
            <h3>MEAT</h3>
            <RaisedButton
              label='cheese'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='pepperoni'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='mushrooms'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='olives'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='peppers'
              secondary={true}
            />
          </div>
          <div style={column}>
            <h3>VEGETABLES</h3>
            <RaisedButton
              label='cheese'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='pepperoni'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='mushrooms'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='olives'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='peppers'
              secondary={true}
            />
          </div>
          <div style={column}>
            <h3>CHEESE</h3>
            <RaisedButton
              label='reg'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='cheese'
              secondary={true}
              />
          </div>
        </CardActions>
        </Card>
      </div>
    );
  }
}
