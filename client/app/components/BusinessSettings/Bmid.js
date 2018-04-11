import React, {Component} from 'react';
import ReactDom from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

import AddCategory from './AddCategory.js';

export default class Bmid extends Component {
  render () {
    return (
      <div>
        <h1>Settings</h1>

        <section style={middleSections}>
          <div style={box}>
            <AddCategory />
          </div>
          <div style={box}>
            <RaisedButton label='Add an item' className='button-style'/>
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
            Welcome to the settings page. In here, you can edit your restaurant information, add or remove users from your restaurant, and configure your categories and items.
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
