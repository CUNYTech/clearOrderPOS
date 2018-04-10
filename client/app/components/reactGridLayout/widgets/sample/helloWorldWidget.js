//Sample widget to try.
import React from 'react';
import AbstractWidget from '../abstractWidget';

export default class HelloWorldWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      inc: 0
    };
    setInterval(() => {this.setState({inc: this.state.inc + 10})}, 2000);
  }

  renderContent() {
    return (
      <div>
        <h2>Hello world !</h2>
      </div>
    );
  }

  renderFooter() {
    return (
      <p>Footer</p>
    )
  }

}
