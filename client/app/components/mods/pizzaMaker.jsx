import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import InlineBlock from 'react-inline-block';
import { outerBox, cardStyle, cardContents } from '../../styles/cardStyle';

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
          </InlineBlock>
          <InlineBlock>
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
          </InlineBlock>
          <InlineBlock>
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
          </InlineBlock>
          <InlineBlock>
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
          </InlineBlock>
        </CardActions>
        </Card>
      </div>
    );
  }
}
