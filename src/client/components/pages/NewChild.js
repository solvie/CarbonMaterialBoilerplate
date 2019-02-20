import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import BackChildren from '../common/BackChildren';
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

    children: [],
    users:[]
  }

  componentWillMount() {
    console.log("Enter componentWillMount");
    var Team;
    var Children;

    //--get children
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
      console.log(Team)
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
    console.log("NEW ID:" + this.generateChildId())
    this.packageChild();
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value});
  }

  handleDateChangeDob = event => {
    console.log(event[0].toISOString())
    this.setState({ dateOfBirth: event[0].toISOString()})
  }

  handleDateChangeJoined = event => {
    console.log(event[0].toISOString())
    this.setState({ dateJoined: event[0].toISOString()})
  }

  formatKeyVal(key, val){
    return `${key}=>${val}`;
  }

  formatNameRole(name, role){
    return `${name}, ${role}`;
  }

  generateChildId(){
    var highest=0;
    this.state.children.forEach( child =>{
      if (child.id>highest) highest = parseInt(child.id)
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
      id: this.generateChildId(),
      fullName: this.state.fullName,
      location: this.state.location,
      // dateOfBirth: '2019-02-20T05:37:24.927Z',
      // dateJoined: '2019-02-20T05:37:24.927Z',
      dateOfBirth: this.state.dateOfBirth,
      dateJoined: this.state.dateJoined,
      assignedLawyerId: this.state.assignedLawyer.split('=>')[0],
      assignedLawyerName: this.state.assignedLawyer.split('=>')[1]
    }
    console.log ('newChild:' + JSON.stringify(newChild))

    var request3 = new XMLHttpRequest();
  	request3.open('POST', 'http://9.30.210.124:3000/api/Child', true);
  	request3.setRequestHeader('Content-Type','application/json');
  	request3.setRequestHeader('Accept', 'application/json');

    request3.onreadystatechange = function() {
      if(request3.readyState === 4 && request3.status === 200) {
        alert('child Created Successfully!');
        console.log("my console output",request3.responseText);
      } else {
        console.log("Failed! My console output:",request3.responseText);
      }
    }
    request3.send(JSON.stringify(newChild));
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <BackChildren />
          <Grid container justify="center">
          <Form onSubmit={this.handleSubmit}>
            <TextInput id='fullName' labelText="Child's Full Name" placeholder='Firstname Lastname' onChange={this.handleChange} required/>
            <br />
            <DatePicker id='dateOfBirth' datePickerType='single' dateFormat='m/d/Y' onChange={this.handleDateChangeDob}>
                    <DatePickerInput labelText="Child's Date of Birth" placeholder='mm/dd/yyyy'/>
            </DatePicker>
            <br />
            <TextInput id='location' labelText="Location" placeholder='' onChange={this.handleChange} required/>
            <br />
            <DatePicker id='dateJoined'  datePickerType='single' dateFormat='m/d/Y' onChange={this.handleDateChangeJoined}>
                <DatePickerInput labelText="Date Joined" placeholder='mm/dd/yyyy'/>
            </DatePicker>
            <br />
            <br />
            <Select id='assignedLawyer' labelText='Assignee' onChange={this.handleChange} required>
            <SelectItem value='' text=''/>
              {users.map(user => (
                <SelectItem value={this.formatKeyVal(user.id, user.fullName)} text={this.formatNameRole(user.fullName,user.role)}/>
              ))
              }
            </Select>
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
