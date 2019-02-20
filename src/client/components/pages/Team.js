import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from '../common/Topbar';
import { DataTable } from 'carbon-components-react';
const {
  Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow
} = DataTable;

const backgroundShape = require('../../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  }
});

class Team extends Component {
  state = {
    rows : [ //initialize with examples
    ],

    headers : [
      {
        key: 'fullName',
        header: 'Full Name'
      },
      {
        key: 'role',
        header: 'Role'
      }
    ]
  };

  componentWillMount(){
	  var TeamList;
	  var request = new XMLHttpRequest();

	  request.open('GET', 'http://9.30.210.124:3000/api/User', true);
	  request.onload = () => {


	  TeamList = JSON.parse(request.response);
      this.setState({
        rows: TeamList//fetch values from backend
      });
	    if (request.status >= 200 && request.status < 400) {
	      TeamList.forEach(user => {
	        console.log(user.fullName);
	      });
	    } else {
	      console.log('error');
	    }
	  }

	  request.send();
  }

  render() {
    const { classes } = this.props;
    const {
      rows, headers
    } = this.state;
    const currentPath = this.props.location.pathname;


    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
            <DataTable
              rows={rows}
              headers={headers}
              render={({ rows, headers, getHeaderProps }) => (
                <TableContainer title="Team Directory">
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Team));
