import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrangeA700} from 'material-ui/styles/colors';
import {amber900} from 'material-ui/styles/colors';


import './index.css';
import App from './App';
import LoginButton from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

//colors
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: amber900,
		accent1Color: deepOrangeA700
	}
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
