import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Paper from 'material-ui/Paper';

class Screen extends Component {

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };


  render() {
    return (
        <Draggable
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>

          <div>

            <Paper
            className = {"Card"}
            style = {{
                height: 200,
                width: 200,
            }}
            zDepth={5}>

              <div className="handle">
                  Handle
              </div>

              <br />

              <div>
                Reciept
              </div>
            </Paper>

          </div>

        </Draggable>
    );
  }
}
export default Screen;
