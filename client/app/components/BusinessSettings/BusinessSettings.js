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
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {outerBusiness, pane, cardStyle, wideButton} from '../../styles/cardStyle';

export default class BusinessSettings extends Component {

  constructor(){
    super();
    this.state = {
      open: false,
      category_name : '',
      item_name : '',
      item_price : '',
      message : {},
      hasErrors : false,
      redirect : false,
      categories : {},
      item_category : '',
      message : '',
      isCategoryError : true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.categoryRemove = this.categoryRemove.bind(this);
    this.removeItem = this.removeItem.bind(this);
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
          categories : response.data[0].business_items,
          item_category : response.data[0].business_items[0].category
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
              isCategoryError : true,
              hasErrors : false,
              category_name : '',
            });
            this.componentWillMount();

        })
        .catch((error) => {
          this.setState({
            message : error.response.data.message,
            hasErrors : true,
            isCategoryError : true
          })
        })
  }

  categoryRemove(event) {
    const category_name = event.currentTarget.name;

    axios.post('/business/remove_category', { category_name })
    .then((response) => {
        this.setState ({
          hasErrors : false,
        });
        this.componentWillMount();
    })
    .catch((error) => {
      this.setState({
        message : error.response.data.message,
        hasErrors : true,
        isCategoryError : true
      })
    })
  }

  addItem(event) {
    event.preventDefault();
    const {item_category, item_name, item_price} = this.state;
    console.log(item_category + '-' + item_name + '-' + item_price);
    axios.post('/business/add_item', { item_name, item_price, item_category })
        .then((response) => {
            this.setState ({
              message : response.data.message,
              hasErrors : false,
              isCategoryError : false
            });
            this.componentWillMount();

        })
        .catch((error) => {
          this.setState({
            message : error.response.data.message,
            hasErrors : true,
            isCategoryError : false
          })
        })
  }

  removeItem(event) {
    const item_name = event.currentTarget.name;
    const item_category = event.currentTarget.getAttribute('category');
    axios.post('/business/remove_item', { item_category, item_name })
    .then((response) => {
        this.setState ({
          hasErrors : false
        });
        this.componentWillMount();
    })
    .catch((error) => {
      this.setState({
        message : error.response.data.message,
        hasErrors : true,
        isCategoryError : false
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
                return (<div key={subIndex}><p>{item.name}<IconButton name={item.name} category={category.category} onClick={this.removeItem}>
                  <ActionClear /></IconButton></p></div>)
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

  printMessage = (message, hasErrors) => {
    if(hasErrors)
      if(message instanceof Object)
        return Object.keys(message).map(index => <div key={index}>{message[index].msg}</div>)
      else
        return <div>{message}</div>
    // no errors, but a message included most likely implies success
    else if(message.length > 0)
      return <div>{message}</div>
    else
      return ''
  }

  render() {
    const {isCategoryError, categories, category_name, item_name, item_price, message, hasErrors} = this.state;

    return (
      <div style={outerBusiness} >
        <div style={pane}>
          <Card style={cardStyle}>
            <h2>Add a Category</h2>
            <form onSubmit={this.onSubmit}>
              {isCategoryError ? this.printMessage(message, hasErrors) : ''}
              <CardText>
                <TextField
                  floatingLabelText="Category Name"
                  floatingLabelFixed={false}
                  value={category_name}
                  name="category_name"
                  onChange={this.onChange}
                />
              </CardText>
              <CardActions>
                <RaisedButton
                  type="submit"
                  label="Add"
                  style={wideButton}
                  primary={true}
                />
              </CardActions>
            </form>
          </Card>

          <Card style={cardStyle}>
            <h2>Add an Item</h2>
            <form onSubmit={this.addItem}>
            {isCategoryError ? '' : this.printMessage(message, hasErrors)}
              <CardText>
                <TextField
                  floatingLabelText="Item Name"
                  floatingLabelFixed={false}
                  value={item_name}
                  name="item_name"
                  onChange={this.onChange}
                />
              </CardText>
              <CardText>
                <TextField
                  floatingLabelText="Item Price"
                  floatingLabelFixed={false}
                  value={item_price}
                  name="item_price"
                  onChange={this.onChange}
                />
              </CardText>
              <CardText>
                <h4>Select a Category</h4>
                <DropDownMenu
                  value={this.state.item_category}
                  onChange={this.onDropMenuChange}
                  autoWidth={true}
                >
                  {this.renderMenuCategories(categories)}
                </DropDownMenu>
              </CardText>
              <CardActions>
                <RaisedButton
                  type="submit"
                  label="Add"
                  style={wideButton}
                  primary={true}
                  />
              </CardActions>
            </form>
          </Card>

          <Card style={cardStyle}>
            <h2>Restaurant Actions</h2>
            <CardActions>
              <RaisedButton
                label='Edit Restaurant Settings'
                style={wideButton}
                primary={true}
              />
            </CardActions>
            <CardActions>
              <RaisedButton
                label='Add/Remove User'
                style={wideButton}
                primary={true}
              />
            </CardActions>
          </Card>
          <Card style={cardStyle}>
            <h2>Go Back</h2>
            <CardActions>
              <Link to='/user/homepage'>
                <RaisedButton
                  label="Return"
                  style={wideButton}
                  secondary={true}
                  />
              </Link>
            </CardActions>
          </Card>
        </div>

        <div style={pane}>
          <Card style={cardStyle}>
            <h2>Categories & Items</h2>
            {this.printCategoriesAndItems(categories)}
          </Card>
        </div>
      </div>
    );
  }
}
