import React, {Component} from 'react';
import ReactDom from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

import AddCategory from './AddCategory.js';

export default class Bmid extends Component {
  render () {
    return (
      <div>
        <h1>middle info</h1>

        <section style={middleSections}>
          <div style={box}>
            <AddCategory />
          </div>
          <div style={box}>
            <RaisedButton label='Remove category' className='button-style'/>
          </div>
          <div style={box}>
            <RaisedButton label='Add an item' className='button-style'/>
          </div>
          <div style={box}>
            <RaisedButton label='remove an item' className='button-style'/>
          </div>
        </section>

        <section style={middleSections}>
          <div>
            <RaisedButton
              label='Edit restaurant settings'
              style={buttonStyle}
              />
          </div>
          <br />
          <div>
            <RaisedButton
              label='Add/Remove user'
              style={buttonStyle}
              />
          </div>
        </section>

        <section style={middleSections}>
          <article>
            Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups
          </article>
        </section>
      </div>
    );
  }
}


const middleSections ={
  alignContent: 'center',
  float: 'none',
  height: 'auto',
  minHeight: '200px',
  maxHeight: '300px',
  textAlign: 'center',
  margin: 'auto',
  padding: '10px',
  verticalAlign: 'middle',
}

const box ={
  float: 'left',
  height: 'auto',
  padding: '20px',
  width: '50%',
}

const buttonStyle ={
  margin: 'auto',
  width: '100%',
}
