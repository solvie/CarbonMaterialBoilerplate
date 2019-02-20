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


const styles = theme => ({
  root: {
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
})

class NewTask extends Component {

  state = {
    taskTitle: '',
    childAssigned: '',
    taskAssignee: '',
    taskDetails: '',
    taskCreator:'',

    users: [],
    children: [],
    tasks:[]
  }

  componentWillMount() {
	  console.log("Enter componentWillMount");
	  var Tasks;
	  var Team;
	  var Children;

	  //--get tasks*/
	  var request = new XMLHttpRequest();
	  request.open('GET', 'http://9.30.210.124:3000/api/Task', true);
	  request.onload = () => {
	    Tasks= JSON.parse(request.response);
	    this.setState({
	      tasks : Tasks
	    });
	    if (request.status != 200) {
	  	  console.log('error');
	    }
	  }

	  request.send();

	  //--get child
	  var request1 = new XMLHttpRequest();
	  request1.open('GET', 'http://9.30.210.124:3000/api/Child', true);
	  request1.onload = () => {
	    Children = JSON.parse(request1.response);
	    this.setState({
	      children : Children
	    });
	    if (request1.status != 200) {
	  	  console.log('error');
	    }
	  }
	  request1.send();
	  //--get team
	  var request2 = new XMLHttpRequest();
	  request2.open('GET', 'http://9.30.210.124:3000/api/User', true);
	  request2.onload =  () => {
	    Team = JSON.parse(request2.response);
	    this.setState({
	      users : Team
	    });
	    if (request2.status != 200) {
	  	  console.log('error');
	    }
	  }
	  request2.send();

  }


  handleSubmit = event => {
  //change current date
	console.log("Enter Submit")
    console.log(this.state);
    this.packageTask();

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

  //checks, this function is not working
  //skip it
  validateTask(){

    if (!this.childAssigned) return false;
    if (!this.taskCreator) return false;
    if (!this.taskAssignee) return false;
    return true; //all is well
  }

  packageTask(){
	console.log("enter packageTask")
    var childIdParsed = this.state.childAssigned.split('=>')[0];
    var childNameParsed = this.state.childAssigned.split('=>')[1];
    var assignedUserIdParsed = this.state.taskAssignee.split('=>')[0];
    var assignedUserNameParsed = this.state.taskAssignee.split('=>')[1];
    var taskCreatorIdParsed = this.state.taskCreator.split('=>')[0];
    var taskCreatorNameParsed = this.state.taskCreator.split('=>')[1];

    console.log(this.state.tasks);
	var request3 = new XMLHttpRequest();
	request3.open('POST', 'http://9.30.210.124:3000/api/Task', true);
	request3.setRequestHeader('Content-Type','application/json');
	request3.setRequestHeader('Accept', 'application/json');

	var newtask = {
        id: this.generateTaskId(),
        childId: childIdParsed.toString(),
        childFullName: childNameParsed,
        assignedUserId: assignedUserIdParsed.toString(),
        assignedUserName: assignedUserNameParsed,
        taskTitle: this.state.taskTitle,
        description: this.state.taskDetails,
        comments: "TEST",
        dateCreated: "2019-02-19T22:44:30.215Z",
        taskCreatedByUserId: taskCreatorIdParsed.toString(),
        taskCreatedByUserName: taskCreatorNameParsed
      };


	request3.onreadystatechange = function() {

	     if(request3.readyState === 4 && request3.status === 200){
			 alert('Task Created Successfully!');
	     	console.log("my console output",request3.responseText);
	     }
		 else{
			 console.log("Failed! My console output",request3.responseText);
		 }

	}
	    request3.send(JSON.stringify(newtask));

  }

  render() {
    const { classes } = this.props;
    const {users, children} = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Back />
          <Grid container justify="center">
          <Form onSubmit={this.handleSubmit}>
            <TextInput id='taskTitle' labelText='Task Title' placeholder='something' onChange={this.handleChange} required/>
            <br />
            <Select id='childAssigned' labelText='Child' onChange={this.handleChange}>
            <SelectItem value='' text=''/>
              {children.map(child => (
                <SelectItem value={this.formatKeyVal(child.id, child.fullName)} text={child.fullName}/>
              ))
              }
            </Select>
            <br />
            <Select id='taskAssignee' labelText='Assignee' onChange={this.handleChange} required>
            <SelectItem value='' text=''/>
              {users.map(user => (
                <SelectItem value={this.formatKeyVal(user.id, user.fullName)} text={this.formatNameRole(user.fullName,user.role)}/>
              ))
              }
            </Select>
            <br />
            <Select id='taskCreator' labelText='Task Creator' onChange={this.handleChange}>
            <SelectItem value='' text=''/>
              {users.map(user => (
                <SelectItem value={this.formatKeyVal(user.id, user.fullName)} text={this.formatNameRole(user.fullName,user.role)}/>
              ))
              }
            </Select>
            <br />
            <TextArea id='taskDetails' labelText='Details' placeholder='Enter details about this task' onChange={this.handleChange}/>
            <br />
            <Button type="button" onClick={() => (this.handleSubmit())}>
              Create Task
            </Button>
          </Form>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(NewTask))
