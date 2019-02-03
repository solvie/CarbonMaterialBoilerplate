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
import DataTableEE from '../common/DataTableEE';
import DataTableChildren from '../common/DataTableChildren';

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
  render() {
    const { classes } = this.props;
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
                    <DataTableChildren />
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
