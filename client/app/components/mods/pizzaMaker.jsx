import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import InlineBlock from 'react-inline-block';
import { outerBox, cardStyle, cardContents, buttonStyle } from '../../styles/cardStyle';

const column = {
  float: 'left',
  width: '25%',
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
        <CardActions style={cardContents}>
          <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>SIZE</h3>
              <RaisedButton
                label='small'
                style={buttonStyle}
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='large'
                secondary={true}
                />
            </div>
          </InlineBlock>
          <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>1/2</h3>
              <RaisedButton
                style={buttonStyle}
                label='cheese'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='pepperoni'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='mushrooms'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='olives'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='peppers'
                secondary={true}
              />
            </div>
          </InlineBlock>
          <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>2/2</h3>
              <RaisedButton
                style={buttonStyle}
                label='cheese'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='pepperoni'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='mushrooms'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='olives'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='peppers'
                secondary={true}
              />
            </div>
          </InlineBlock>
          <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>CRUST</h3>
              <RaisedButton
                style={buttonStyle}
                label='reg'
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='cheese'
                secondary={true}
                />
            </div>
          </InlineBlock>
        </CardActions>
        </Card>
      </div>
    );
  }
}
