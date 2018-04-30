import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { outerBox, cardStyle, cardContents } from '../../styles/cardStyle';

export default class FirstWidget extends Component {
    render() {
      return (
        <div style={outerBox} >
          <Card style={cardStyle}>
            <div className="cardContents" style={cardContents}>
              <CardHeader title="The Dins Widget" subtitle="A Placeholder Widget" />
              <CardText>
                Hi, Lorem Ipsum Sumdilumdi
              </CardText>
            </div>
          </Card>
        </div>

      );
    }
  }
