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

export default class BurgerMaker extends Component {
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
              label='roll'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='flatbread'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='sesame'
              secondary={true}
              />
          </div>
          <div style={column}>
            <h3>BURGER</h3>
            <RaisedButton
              label='chicked'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='beef'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='turkey'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='mushroom'
              secondary={true}
            />
            <Divider style={dividePad} />
            <RaisedButton
              label='none'
              secondary={true}
            />
          </div>
          <div style={column}>
            <h3>VEGETABLES</h3>
            <RaisedButton
              label='tomatoes'
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
              label='cheddar'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='gouda'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='swiss'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='blue'
              secondary={true}
              />
            <Divider style={dividePad} />
            <RaisedButton
              label='monterey jack'
              secondary={true}
              />
          </div>
        </CardActions>
        </Card>
      </div>
    );
  }
}