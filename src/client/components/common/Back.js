import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';

class Back extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          <Link className={classes.link} to={{ pathname: '/dashboard' }}>
            <KeyboardArrowLeft />
            <span className={classes.text}>Back to Dashboard</span>
          </Link>
        </Typography>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Back));
