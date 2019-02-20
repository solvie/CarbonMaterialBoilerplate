import React, { Component } from 'react';
import 'carbon-components/css/carbon-components.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import Routes from './routes';

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

class App extends Component {
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

export default App;
