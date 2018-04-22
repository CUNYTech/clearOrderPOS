import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class FirstWidget extends Component {
    render() {
      return (
        <Card >
          <CardHeader title="The Dins Widget" subtitle="A Useless Widget" />
          <CardText>
            Hi, my name is Dinsdale Lee.
          </CardText>
        </Card>
      );
    }
  }
