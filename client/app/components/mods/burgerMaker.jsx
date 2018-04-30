import React, {Component} from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import InlineBlock from 'react-inline-block';
import { outerBox, cardStyle, cardContents , buttonStyle } from '../../styles/cardStyle';

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

export default class BurgerMaker extends Component {
  render() {
    return (
        <div style={outerBox} >
          <Card style={cardStyle}>
            <CardHeader
              style={{textAlign: 'center',}}
              title="Burger Maker"
              subtitle="Select from the options below"
              actAsExpander={false}
              showExpandableButton={false}
            />
          <CardActions style={cardContents}>
            <InlineBlock>
              <div style={column}>
                <h3 style={buttonStyle}>BUN</h3>
                <RaisedButton
                  style={buttonStyle}
                  label='roll'
                  secondary={true}
                  />
                <Divider style={dividePad} />
                <RaisedButton
                  style={buttonStyle}
                  label='flatbread'
                  secondary={true}
                  />
                <Divider style={dividePad} />
                <RaisedButton
                  style={buttonStyle}
                  label='sesame'
                  secondary={true}
                  />
              </div>
            </InlineBlock>
            <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>BURGER</h3>
              <RaisedButton
                style={buttonStyle}
                label='chicken'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='beef'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='turkey'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='mushroom'
                secondary={true}
              />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='none'
                secondary={true}
              />
            </div>
            </InlineBlock>
            <InlineBlock>
            <div style={column}>
              <h3 style={buttonStyle}>VEGETABLES</h3>
              <RaisedButton
                style={buttonStyle}
                label='tomatoes'
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
              <h3 style={buttonStyle}>CHEESE</h3>
              <RaisedButton
                style={buttonStyle}
                label='cheddar'
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='gouda'
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='swiss'
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='blue'
                secondary={true}
                />
              <Divider style={dividePad} />
              <RaisedButton
                style={buttonStyle}
                label='monterey'
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
