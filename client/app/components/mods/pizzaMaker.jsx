import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const outerBox = {
  margin: 'auto',
  width: '75%',
  padding: 20,
  overflow: 'auto',
  textAlign: 'center',
};

const cardStyle = {
  padding: 20,
  overflow: 'auto',
};

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
            title="Pizza Maker"
            subtitle="select from the options below"
            actAsExpander={false}
            showExpandableButton={false}
          />
        <CardActions>
          <div style={column}>
            <h3>SIZE</h3>
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
            <h3>1/2</h3>
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
            <h3>2/2</h3>
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
            <h3>CRUST</h3>
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
