import React from 'react';

var clockStyle = {
  color: '#ffffff',
  paddingTop: '15px',
  paddingLeft: '10px'
}

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }
  render() {
    return (
      <div style={clockStyle}>
        {this.state.time}
      </div>
    );
  }
}
