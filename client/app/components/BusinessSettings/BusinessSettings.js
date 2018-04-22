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
      <div style={outerBusiness} >
        <div style={pane}>
          <Card style={cardStyle}>
            <h2>Add a Category</h2>
            <form onSubmit={this.onSubmit}>
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
            <form onSubmit={this.onSubmit}>
              <CardText>
                <TextField
                  floatingLabelText="Item Name"
                  floatingLabelFixed={false}
                  value={name}
                  onChange={this.onChange}
                />
              </CardText>
              <CardText>
                <TextField
                  floatingLabelText="Item Price"
                  floatingLabelFixed={false}
                  value={name}
                  onChange={this.onChange}
                />
              </CardText>
              <CardText>
                <h4>Select a Category</h4>
                <DropDownMenu
                  value={this.state.value}
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
