import React, { PropTypes } from 'react';

export default class HelloWorld extends React.Component {

  constructor(props, _railsContext) {
    super(props);
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <h3>
          Hello World
        </h3>
      </div>
    );
  }
}
