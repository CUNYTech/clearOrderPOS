import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import {Redirect} from 'react-router-dom'

//Material
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export class AddCategory extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      name : '',
      redirect : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  componentDidMount(){
    axios.get('/user-auth')
      .then((response) => {
        this.setState({redirect : false});
      })
      .catch((error) => {
        this.setState({redirect : true});
      })
  }

  onSubmit(event) {
    event.preventDefault();
    const {name} = this.state;

    axios.post('/business/add_category', { name, redirect })
        .then((response) => {
          console.log(response);
            const message = response.message;
            const redirect = true;
            this.setState ({message, redirect});
        })
        .catch((error) => {
          if(error.response)
            console.log(error.response);
          else 
            console.log('yikes');
        })
  }

  render() {
    const {name, redirect} = this.state;
    if(redirect)
      return <Redirect to="/" />
    
    return (
      <div>
            <form onSubmit={this.onSubmit}>
              <TextField
                floatingLabelText="Category Name"
                floatingLabelFixed={false}
                name='name'
                value={name}
                onChange={this.onChange}
              /><br /><br />

              <RaisedButton type="submit" label="Add" primary={true} />
            </form>
      </div>
    )
  }
}

export default AddCategory;

// ================================================
