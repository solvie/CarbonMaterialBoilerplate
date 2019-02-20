import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  text: {
    display: 'inline-block',
    verticalAlign: 'text-bottom'
  }
});

class BackChildren extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          <Link className={classes.link} to={{ pathname: "/children" }}>
            <KeyboardArrowLeft />
            <span className={classes.text}>Back to children</span>
          </Link>
        </Typography>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(BackChildren));
