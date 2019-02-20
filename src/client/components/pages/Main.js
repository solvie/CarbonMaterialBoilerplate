import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'carbon-components/css/carbon-components.css';
import { Button } from 'carbon-components-react';
import { Tab } from 'carbon-components-react';
import { Tabs } from 'carbon-components-react';
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
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }
});

class Main extends Component {

  state = {
    rows : [ //initialize with examples
      {
        id: 'acor1',
        name: 'Angela Cortez',
        assigned: 'Beatriz',
        tasks: '3',
        status: 'NEW'
      },
      {
        id: 'pacor1',
        name: 'Pablo Cortez',
        assigned: 'Beatriz',
        tasks: '2',
        status: 'ADOPTION ONGOING'
      }
    ],

    headers : [
      {
        key: 'name',
        header: 'Full Name',
      },
      {
        key: 'assigned',
        header: 'Assigned',
      },
      {
        key: 'tasks',
        header: 'Tasks',
      },
      {
        key: 'status',
        header: 'Status',
      }
    ]
  };


  updateValues() {
    this.setState({
      //fetch values from backend
    });
  }

  componentDidMount() {
    this.updateValues();
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
        <Topbar />
        Welcome Banner
        <Tabs>
          <Tab label="Tab label 1">
            <div className={classes.root}>
              <Grid container justify="center">
                <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                  <Grid item>
                  <DataTable
                    rows={rows}
                    headers={headers}
                    render={({ rows, headers, getHeaderProps }) => (
                      <TableContainer title="Children Status">
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
              </Grid>
            </div>
          </Tab>
          <Tab label="Tab label 2">
            <div>Content for second tab goes here.</div>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }

}

export default withRouter(withStyles(styles)(Main));
