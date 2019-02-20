import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from '../common/Topbar';
import { DataTable } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
const {
  Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow
} = DataTable;
var ChildList = require('../jsons/children.json');

// const backgroundShape = require('../../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    // background: `url(${backgroundShape}) no-repeat`,
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

class Children extends Component {
  state = {
    rows : [ //initialize with examples

    ],

    headers : [
      {
        key: 'fullName',
        header: 'Full Name',
      },
      {
        key: 'dateOfBirth',
        header: 'Date of Birth',
      },
      {
        key: 'location',
        header: 'Location',
      },
      {
        key: 'dateJoined',
        header: 'Date Joined',
      }
    ]
  };


  updateValues() {
    this.setState({
      rows: ChildList//fetch values from backend
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
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
            <Link className={classes.link} to={{ pathname: "/children/new" }}>
                <Button>Add Child</Button>
            </Link>
            <DataTable
              rows={rows}
              headers={headers}
              render={({ rows, headers, getHeaderProps }) => (
                <TableContainer title="Children Directory">
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

export default withRouter(withStyles(styles)(Children));
