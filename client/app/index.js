import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrangeA700} from 'material-ui/styles/colors';
import {amber900} from 'material-ui/styles/colors';

import './index.css';
import App from './App.js';
import LoginButton from './App.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
// react-grid-layout related imports
//for <Provider store={store} to be used below.

const config = {
  google: {
    families: ['Open Sans Condensed:300,700'],
  }
};
import {colorOne, colorTwo, colorThree, colorFour} from './styles/colorPalette';

//colors
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: colorOne,
		accent1Color: colorTwo,
	}
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
