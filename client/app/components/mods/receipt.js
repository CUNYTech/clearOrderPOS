import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {receiptStyle, receiptHeader, receiptBody, receiptFooter} from '../../styles/cardStyle';
import ScaleText from 'react-scale-text';
import axios from 'axios';

export default class Receipt extends Component {

  constructor(){
    super();
    this.state = {
      tables : [],
      table_name : '',
      current_table : '',
      message : '',
      hasErrors : false,
      isAddingTableError : false,
    }

    this.addTable = this.addTable.bind(this);
    this.renderTables = this.renderTables.bind(this);
  }

  componentWillMount(){
    const categories = this.state;
    axios.get('/business/get-tables')
      .then((response) => {
        if(response.data[0].business_tables.length == 0)
        {
          this.setState({
            tables : response.data[0].business_tables,
            message : 'Enter a new Table!'
          })
        }else{
          this.setState({
            tables : response.data[0].business_tables,
            current_table : response.data[0].business_tables[0].table_name
          })
        }
      })
      .catch((error) => {
      })
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onDropMenuChange = (event, index, current_table) => this.setState({current_table});

  addTable = (event) => {
    event.preventDefault();
    const {table_name} = this.state;
    axios.post('/business/add-table', {table_name})
      .then((response) => {
        this.setState({
          table_name : '',
          message : response.data.message
        })
        this.componentWillMount();
      })
      .catch((error) => {
        this.setState({
          message : error.response.data.message,
          hasErrors: true,
          isAddingTableError : true
        })
      })
  }

  removeTable = (event) => {
    event.preventDefault();
    const {current_table} = this.state;

    axios.post('/business/remove-table', { current_table })
    .then((response) => {
        this.componentWillMount();
    })
    .catch((error) => {
      this.setState({
        message : error.response.data.message,
        hasErrors : true,
        isAddingTableError : false
      })
    })
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

  renderTables = (tables) => {
    if(tables.length > 0) {
      return (
        tables.map((table, index) => {
          return (
            <MenuItem key={index} value={table.table_name} primaryText={table.table_name} />
          )
        })
      )
    }
  }

  render() {
    const {tables, table_name, current_table, message, hasErrors, isAddingTableError} = this.state;
    return (
      <Card style={receiptStyle} >
        <CardText style={receiptHeader}>
          <ScaleText maxFontSize={24}>
          <h1>RECEIPT</h1></ScaleText>
          <div>
            <h2>Current Table</h2>
            {isAddingTableError ? '' : this.printMessage(message, hasErrors)}
            <DropDownMenu
              value={current_table}
              onChange={this.onDropMenuChange}
              autoWidth={true}
            >
              {this.renderTables(tables)}
            </DropDownMenu>
          </div>
          <form onSubmit={this.removeTable}>
            <RaisedButton
              type="submit"
              label="Remove Table"
              primary={true}
            />
          </form>
        </CardText>
        <br/>
        <div style={receiptBody}>
          <CardText >
            <div style={{float: 'left'}}>
              <h4>Pizza</h4>
              <h4>Burger</h4>
              <h4>Fries</h4>
              <h4>Sprite</h4>
              <h4>Chips</h4>
            </div>
            <div style={{float: 'right'}}>
              <h4>3.00</h4>
              <h4>7.50</h4>
              <h4>2.00</h4>
              <h4>1.50</h4>
              <h4>1.00</h4>
            </div>
          </CardText>
        </div>
        <div style={receiptFooter}>
          <CardText>
            <div style={{float: 'left'}}>
              <h4>Total</h4>
            </div>
            <div style={{float: 'right'}}>
              <h4>25.00</h4>
            </div>
          </CardText>
        </div>
        <div>
            <form onSubmit={this.addTable}>
                <TextField
                  floatingLabelText="Table Name"
                  floatingLabelFixed={false}
                  value={table_name}
                  name="table_name"
                  onChange={this.onChange}
                  />
                <RaisedButton
                  type="submit"
                  label="Add a Table"
                  primary={true}
                />
            </form>
            {isAddingTableError ? this.printMessage(message, hasErrors) : ''}
          </div>
      </Card>
    );
  }
}
