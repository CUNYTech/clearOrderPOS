import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom'

//Material
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export class Bleft extends Component {
  constructor(){
    super();
    this.state = {
      categories : {},
    };
  }

  componentWillMount(){
    const categories = this.state;

    axios.get('/business/get-categories')
      .then((response) => {
        console.log(response.data[0].business_items);
        this.setState({
          categories : response.data[0].business_items 
        })
      })
      .catch((error) => {
      })
  }

  printMessage = (categories) => {
    if(categories.length > 0) {
      return (
        categories.map((category, index) => {
          return(
            <div key={index}><h1>{category.category}</h1>{
              category.items.map((item, subIndex) => {
                return (<div key={subIndex}>{item.name}</div>)
              })
            }
            </div>
          )
        })
      )
    }
  }
  render() {
    const {categories} = this.state;
          
    return (
      <div>
        <h1>Categories & Items</h1>
        {this.printMessage(categories)}

      </div>
    )
  }
}

export default Bleft;

// ================================================
