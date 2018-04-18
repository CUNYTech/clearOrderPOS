import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class FirstWidget extends Component {
    render() {
      return (
        <Card >
          <CardHeader title="The Dins Widget" subtitle="HolySHIEEEEET" />
          <CardText>
          Hi, my name is Dinsdale Lee.
          </CardText>
          <div>
            <h6>
              <span>Wow I cant believe this works</span>
            </h6>
          </div>
        </Card>
      );
    }
  }
