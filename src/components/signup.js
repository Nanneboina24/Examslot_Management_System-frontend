import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbarhome from "./navbarhome.component";
import { BsFillEnvelopeFill, BsShieldLockFill,BsPersonFill,BsCalendarMonthFill,BsBank2,BsFillBarChartFill} from "react-icons/bs";

export default class Signup extends Component{
  constructor(props) {
    super(props);

    //binding(making functions to use properties like setState etc) functions to this class Signup component
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);

    //state object used for variable declarartins in component
    this.state = {
      username: '',
      dob:'',
      email:'',
      password: '',
      department: '',
      year: '',
      boxdepartment: ['','CSE','ECE','EEE','CIVIL','MECH'],
      boxyear:['','1','2','3','4']
    }
  }

  //state variable updation functions
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDob(dob) {
    this.setState({
      dob: dob
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    })
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value
    })
  }

  //form submission
  onSubmit(e) {
    e.preventDefault();

    const adduser = {
      username: this.state.username,
      dob: this.state.dob,
      email: this.state.email,
      password: this.state.password,
      department: this.state.department,
      year: this.state.year,
    }

    console.log(adduser);

    //accessing backend url 
    axios.post('http://localhost:5000/esmsrouting/adduser', adduser)
    .then(res => {
      alert(res.data)

      //navigation between components
      window.location = '/login';
    })
    .catch(err => alert(err.data))
  }

  onClear(){
    this.setState({ 
      username: '',
      dob:'',
      email:'',
      password: '',
      department: '',
      year: ''
    });
  }

//HTML View
render() {
    return (
    <div>
       <Navbarhome /> 
       <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3 mb-3 shadow-lg ">
            <h3 style={{textAlign: 'center'}}>Signup</h3>
            <br />
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
              <BsPersonFill style={{fontSize: '20px'}}/>
                <label><b>Username:</b> </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}  //binding state variable(username) to text field 
                    onChange={this.onChangeUsername}  //function used fot updating state variable(username)
                    />
              </div>
             
              <div className="form-group">
              <BsCalendarMonthFill style={{fontSize: '20px'}}/>
                <label><b>DOB: </b></label>
                <div>
                  <DatePicker
                    required
                    selected={this.state.dob}
                    onChange={this.onChangeDob}
                  />
                </div>
              </div>
              <br/>
              <div className="form-group"> 
              <BsFillEnvelopeFill style={{fontSize: '20px'}}/>
                <label><b>Email: </b></label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
              </div>
            
              <div className="form-group">
              <BsShieldLockFill style={{fontSize: '20px'}}/>
                <label><b>Password: </b></label>
                <input 
                    type="password" 
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
              <br/>
              <div className="form-group">
              <BsBank2 style={{fontSize: '20px'}}/>
                <label><b>Department:</b> </label>
                <select ref="userInput"
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.department}
                    onChange={this.onChangeDepartment}>
                    {
                      this.state.boxdepartment.map(function(dept) {
                        return <option 
                          key={dept}
                          value={dept}>{dept}
                          </option>;
                      })
                    }
                </select>
              </div>
              
              <div className="form-group">
              <BsFillBarChartFill style={{fontSize: '20px'}}/>
                <label><b>Year: </b></label>
                <select ref="userInput2"
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.year}
                    onChange={this.onChangeYear}>
                    {
                      this.state.boxyear.map(function(year) {
                        return <option 
                          key={year}
                          value={year}>{year}
                          </option>;
                      })
                    }
                    </select>
                    
              </div>
              <br />
              <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-dark" />
                <input type="button" value="Clear" className="btn btn-dark" style={{float: 'right'}} onClick={this.onClear} />
              </div>
            </form>
       </div>
      </div>
     </div>
    </div>
    )
  }
}