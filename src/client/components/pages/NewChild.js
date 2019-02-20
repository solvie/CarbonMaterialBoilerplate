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

const styles = theme => ({
  root: {
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
})

class NewChild extends Component {

  state = {
    fullName: '',
    dateOfBirth: '',
    location: '',
    dateJoined: '',
    assignedLawyer: '',

    users:[]
  }

  componentWillMount() {
    console.log("Enter componentWillMount");
    var Team;

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
    //submit it into the thing.
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

  packageChild(){
    console.log('packageChild()')

    var newChild = {
      fullName = this.state.fullName
      dateOfBirth = this.state.dateOfBirth
      location = this.state.location
      dateJoined = this.state.dateJoined
      assignedLawyerId = this.state.assignedLawyer.split('=>')[0];
      assignedLawyerName = this.state.assignedLawyer.split('=>')[1];
    }
    console.log ('newChild' + JSON.stringify(newChild))

    var request3 = new XMLHttpRequest();
  	request3.open('POST', 'http://9.30.210.124:3000/api/Task', true);
  	request3.setRequestHeader('Content-Type','application/json');
  	request3.setRequestHeader('Accept', 'application/json');

    request3.onreadystatechange = function() {
      if(request3.readyState === 4 && request3.status === 200) {
        alert('child Created Successfully!');
        console.log("my console output",request3.responseText);
      } else {
        console.log("Failed! My console output",request3.responseText);
      }
    }
    request3.send(JSON.stringify(newChild));
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <BackChildren />
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
            <br />
            <Select id='taskAssignee' labelText='Assignee' onChange={this.handleChange} required>
            <SelectItem value='' text=''/>
              {users.map(user => (
                <SelectItem value={this.formatKeyVal(user.id, user.fullName)} text={this.formatNameRole(user.fullName,user.role)}/>
              ))
              }
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
