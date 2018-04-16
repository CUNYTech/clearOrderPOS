import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom'

//Material
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import ActionClear from 'material-ui/svg-icons/content/clear';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
class BusinessSettings extends Component {

  constructor(){
    super();
    this.state = {
      open: false,
      category_name : '',
      item_name : '',
      item_price : '',
      message : {},
      hasError : false,
      redirect : false,
      categories : {},
      value : '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.categoryRemove = this.categoryRemove.bind(this);
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onDropMenuChange = (event, index, value) => this.setState({value});

  componentWillMount(){
    const categories = this.state;

    axios.get('/business/get-categories')
      .then((response) => {
        this.setState({
          categories : response.data[0].business_items 
        })
      })
      .catch((error) => {
      })
  }

  onSubmit(event) {
    event.preventDefault();
    const {category_name} = this.state;

    axios.post('/business/add_category', { category_name })
        .then((response) => {
            this.setState ({
              message : response.data.message,
              hasError : false,
              category_name : '',
              categories : this.state.categories,
            });
            this.componentWillMount();

        })
        .catch((error) => {
          this.setState({
            message : error.response.data.message,
            hasError : true
          })
        })
  }

  categoryRemove(event) {
    const category_name = event.currentTarget.name;
    
    axios.post('/business/remove_category', { category_name })
    .then((response) => {
        this.setState ({
          message : response.data.message,
          hasError : false,
          categories : this.state.categories
        });
        this.componentWillMount();
    })
    .catch((error) => {
      this.setState({
        message : error.response.data.message,
        hasError : true
      })
    })
  }

  printCategoriesAndItems = (categories) => {
    if(categories.length > 0) {
      return (
        categories.map((category, index) => {
          return(
            <div key={index}><h1>{category.category}<IconButton name={category.category} onClick={this.categoryRemove}>
              <ActionClear /></IconButton></h1>{
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

  renderMenuCategories = (categories) => {
    if(categories.length > 0) {
      return (
        categories.map((category, index) => {
          return (
            <MenuItem key={index} value={category.category} primaryText={category.category} />
          )
        })
      )
    }
  }

  render() {
    const {categories, category_name} = this.state;

    return (
      <div>
        <div style={outside}>
          <div style={listingPane}>
            <h1>Categories & Items</h1>
            {this.printCategoriesAndItems(categories)}
          </div>

          <div style={settingsPane}>
            <h1>Settings</h1>
            <form onSubmit={this.onSubmit}>
              <TextField
                floatingLabelText="Category Name"
                floatingLabelFixed={false}
                value={category_name}
                name="category_name"
                onChange={this.onChange}
              />
              <br /><br />
              <RaisedButton type="submit" label="Add" primary={true} />
            </form>
            <form onSubmit={this.onSubmit}>
              <TextField
                floatingLabelText="Item Name"
                floatingLabelFixed={true}
                value={name}
                onChange={this.onChange}
              />
              <br/>
              <TextField
                floatingLabelText="Item Price"
                floatingLabelFixed={true}
                value={name}
                onChange={this.onChange}
              />
              <br/>
              <p>Category</p>
              <DropDownMenu
              value={this.state.value}
              onChange={this.onDropMenuChange}
              autoWidth={true}
              >
                {this.renderMenuCategories(categories)}
              </DropDownMenu>
              <br /><br />
              <RaisedButton type="submit" label="Add" primary={true} />
            </form>
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
          </div>

        </div>

      </div>
    );
  }
}

export default BusinessSettings;

const outside = {
  boxSizing: 'border-box',
  overflow: 'auto',
  width: '100%',
  margin: 'auto',
  padding: '10px',
  overflow: 'auto',
}

const listingPane = {
  alignItems: 'center',
  textAlign: 'center',
  float: 'left',
  height: '100%',
  minHeight: '500px',
  width: '50%',
  marginRight: '10px',
  overflow: 'auto',
}

const settingsPane = {
  alignItems: 'center',
  textAlign: 'center',
  float: 'left',
  height: '100%',
  minHeight: '500px',
  marginLeft: '15px',
  width: '30%',
  overflow: 'auto',
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
