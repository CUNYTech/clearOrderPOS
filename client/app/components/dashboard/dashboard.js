//React & Essentials
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Material
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ActionClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

//Other
import WidgetsGrid from '../reactGridLayout/WidgetsGrid';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Receipt from '../mods/receipt';

import {dashReceipt, receiptStyle, receiptHeader, receiptBody, receiptFooter} from '../../styles/cardStyle';
import ScaleText from 'react-scale-text';
import axios from 'axios';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const dashboardStyle = {
  backgroundColor: 'white',
  color:'white',
}

const pos = {
  boxSizing: 'border-box',
  border: '5px solid white',
  borderRadius: '15px',
  margin: '0px',
  padding: '0px',
  width: '100%',
  height: '100%',
  height: '100vh',
  maxHeight: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
  overflow: 'none',
}

const receipt = {

}

const mods = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  padding: '0px',
  margin: '0px',
  textAlign: 'center',
  width: '75%',
  minWidth: '75%',
  maxWidth: '75%',
  overflow: 'auto',
}


export default class DashBoard extends Component {
  constructor(){
    super();
    this.state = {
      tables : [],
      table_name : '',
      current_table : '',
      message : '',
      hasErrors : false,
      isAddingTableError : false,
      total_price : 0,
      isForcedUpdate : false
    }

    this.addTable = this.addTable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDropMenuChange = this.onDropMenuChange.bind(this);
    this.renderTables = this.renderTables.bind(this);
    this.printItems = this.printItems.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillMount(){
    const {categories, isForcedUpdate} = this.state;

    axios.get('/business/get-tables')
      .then((response) => {
        if(response.data[0].business_tables.length == 0)
        {
          this.setState({
            tables : response.data[0].business_tables,
            message : 'Enter a new Table!'
          })
        }else if(isForcedUpdate === true){
          this.setState({
            isForcedUpdate : false,
            tables : response.data[0].business_tables,
            current_table : this.state.current_table
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

  forceUpdate() {
    this.setState({
      isForcedUpdate : true
    })
    this.componentWillMount();
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

  removeItem(event) {
    const item_name = event.currentTarget.name;
    const {current_table} = this.state;

    axios.post('/business/remove-table-item', { current_table, item_name })
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
        isAddingTableError : false
      })
    })
  }
  removeTable = (event) => {
    event.preventDefault();
    const {current_table} = this.state;

    axios.post('/business/remove-table', { current_table })
    .then((response) => {
      this.setState({
        hasErrors : false
      })
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

  printItems = (tables, current_table) => {
    const {total_price} = this.state;
    if(tables.length > 0) {
      return (
        tables.map((table, index) => {
          if(table.table_name === current_table){
            return(
              <div key={index}>{
                table.items.map((item, subIndex) => {
                  return (
                    <div key={subIndex}>
                        {item.name}
                        {'    $' + item.price}
                        <IconButton name={item.name} onClick={this.removeItem}>
                        <ActionClear /></IconButton>
                    </div>)
                })
              }
              </div>
            )
          }
        })
      )
    }
  }
  render() {
    const {tables, table_name, current_table, message, hasErrors, isAddingTableError} = this.state;

    return (
      <div style={pos} >
        <div style={dashReceipt}>
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
              {this.printItems(tables, current_table)}
            </CardText>
          </div>
          <div style={receiptFooter}>
            <CardText>

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
            <br/><br/>
            <RaisedButton
                type="submit"
                label="Checkout"
                primary={true}
                onClick={this.removeTable}
              />
            {isAddingTableError ? this.printMessage(message, hasErrors) : ''}
          </div>
        </Card>
        </div>
        <div style={mods}>
          <ResponsiveReactGridLayout
            className="wid_Grid"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            <div key="wid_grid" data-grid={{x: 5, y: 0, w:12, h: 7, static: true}}>
              <Paper zDepth={5} rounded={true}>
                  <WidgetsGrid current_table={current_table} forceUpdate={this.forceUpdate}/>
              </Paper>
            </div>
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}
