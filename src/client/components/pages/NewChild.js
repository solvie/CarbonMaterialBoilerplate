import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Back from '../common/Back';
import { Button } from 'carbon-components-react';
import { Form } from 'carbon-components-react';
import { Select, SelectItem } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { TextArea } from 'carbon-components-react';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
var Tasks = require('../jsons/tasks.json');
var Team = require('../jsons/team.json');
var Children = require('../jsons/children.json');

const styles = theme => ({
  root: {
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
})

class NewChild extends Component {

  state = {
    childFullName: '',
    childDOB: '',
    childLocation: '',
    childDateJoined: ''
  }

  handleSubmit = event => {
  //change current date
    console.log(this.state);
    if (this.validateChild()){
      //submit it into the thing.
      this.packageTask();
    }
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value});
  }

  formatKeyVal(key, val){
    return `${key}=>${val}`;
  }

  formatNameRole(name, role){
    return `${name}, ${role}`;
  }

  componentDidMount() {
    this.setState({

    });
  }

  generateTaskId(){
    var highest=0;
    this.state.tasks.forEach( task =>{
      if (task.id>highest) highest = parseInt(task.id)
    });
    return highest+1;
  }

  getDate(){
    var date = new Date();
    var month = date.getUTCMonth()+1;
    return `${date.getUTCDate()}/${month}/${date.getFullYear()}`;
  }

  //checks
  validateChild(){
    if (!this.childAssigned) return false;
    if (!this.taskCreator) return false;
    if (!this.taskAssignee) return false;
    return true; //all is well
  }

  packageChild(){
    var childIdParsed = this.state.childAssigned.split('=>')[0];
    var childNameParsed = this.state.childAssigned.split('=>')[1];
    var assignedUserIdParsed = this.state.taskAssignee.split('=>')[0];
    var assignedUserNameParsed = this.state.taskAssignee.split('=>')[1];
    var taskCreatorIdParsed = this.state.taskCreator.split('=>')[0];
    var taskCreatorNameParsed = this.state.taskCreator.split('=>')[1];

    this.state.tasks.push(
      {
        id: this.generateTaskId(),
        childId: childIdParsed,
        childFullName: childNameParsed,
        assignedUserId: assignedUserIdParsed,
        assignedUserName: assignedUserNameParsed,
        taskTitle: this.state.taskTitle,
        description: this.state.taskDetails,
        comments: "",
        dateCreated: this.getDate(),
        taskCreatedByUserId: taskCreatorIdParsed,
        taskCreatedByUserName: taskCreatorNameParsed
      }
    )
    console.log(this.state.tasks);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Back />
          <Grid container justify="center">
          <Form onSubmit={this.handleSubmit}>
            <TextInput id='childFullName' labelText="Child's Full Name" placeholder='Firstname Lastname' onChange={this.handleChange} required/>
            <br />
            <DatePicker id='childDOB' datePickerType='single' dateFormat='m/d/Y'>
                    <DatePickerInput labelText="Child's Date of Birth" placeholder='mm/dd/yyyy'/>
            </DatePicker>
            <br />
            <TextInput id='childLocation' labelText="Location" placeholder='' onChange={this.handleChange} required/>
            <br />
            <DatePicker id='childJoined' datePickerType='single' dateFormat='m/d/Y'>
                <DatePickerInput labelText="Date Joined" placeholder='mm/dd/yyyy'/>
            </DatePicker>
            <br />
            <Button type="submit">
              Add Child
            </Button>
          </Form>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(NewChild))
