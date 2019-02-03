import React, { Component } from 'react';
import 'carbon-components/css/carbon-components.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes'
import './app.css';
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    useNextVariatns: true,
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

export default class App extends Component {

  render() {

    return (
      <body>
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
      </body>
    );
  }
}
