import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbaradmin from "../navbaradmin";


export default class Adcreate extends Component{
  constructor(props) {
    super(props);

    //binding functions to this class Signup component
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeSession = this.onChangeSession.bind(this);
    this.onChangeVenue = this.onChangeVenue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);

    //state object used for variable declarartins in component
    this.state = {
      username: '',
      email:'',
      department: '',
      year: '',
      subject:'',
      date: '',
      session:'',
      venue: '',
      students:[],
      boxsession: ['','10:00 AM','2:00 PM'],
      boxvenue: ['','BLOCK-A','BLOCK-B','BLOCK-C','BLOCK-D'],
      boxyear:['','1','2','3','4'],
      boxsubject:[],
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })

     //auto filling fields(email,dept) based on username
     const data={
      username:e.target.value
    }
    console.log(data);
    axios.post('http://localhost:5000/esmsrouting/specificstudent',data)
    .then(response => {
      if (response.data.length > 0) {
        console.log(response.data);
        this.setState({
          email: response.data[0].email,
          department: response.data[0].department,
         
        })
      }
    })
    .catch((error) => {
      console.log(error);
    }) 

   
    
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
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

     //auto filling fields(username) based on year
    const data={
      year:e.target.value
    }
    console.log(data);

     axios.post('http://localhost:5000/esmsrouting/getstudents',data)
      .then(response => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            students:  [''].concat(response.data.map(user => user.username)),
          })
        

        }
      })
      .catch((error) => {
        console.log(error);
      })

       //auto filling fields(subjects) based on year
       var sublist1=[{sub:'MATHS'},{sub:'PHYSICS'},{sub:'CHEMISTRY'},{sub:'PYTHON'}];
       var sublist2=[{sub:'C'},{sub:'DBMS'},{sub:'JAVA'},{sub:'OS'}];
       var sublist3=[{sub:'NETWORKS'},{sub:'AI'},{sub:'COMPILER'},{sub:'ANDROID'}];
       var sublist4=[{sub:'MERN'},{sub:'MEAN'},{sub:'ML'},{sub:'WEB DEVELOPMENT'}];

       if(e.target.value == 1)
       {
        this.setState({
          boxsubject:  [''].concat(sublist1.map(subject => subject.sub)),
        })
       }
       else if(e.target.value == 2)
       {
        this.setState({
          boxsubject:  [''].concat(sublist2.map(subject => subject.sub)),
        })
       }
       else if(e.target.value == 3)
       {
        this.setState({
          boxsubject:  [''].concat(sublist3.map(subject => subject.sub)),
        })
       }
       else if(e.target.value == 4)
       {
        this.setState({
          boxsubject:  [''].concat(sublist4.map(subject => subject.sub)),
        })
       }


  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeSession(e) {
    this.setState({
      session: e.target.value
    })
  }

  onChangeVenue(e) {
    this.setState({
      venue: e.target.value
    })
  }

  componentDidMount() {
     

  }

  //form submission
  onSubmit(e) {
    e.preventDefault();
    var orgdate = new Date(this.state.date);
    orgdate.setDate(orgdate.getDate()+1);

    const addslot = {
      username: this.state.username,
      email: this.state.email,
      department: this.state.department,
      year: this.state.year,
      subject: this.state.subject,
      date: new Date(orgdate),
      session: this.state.session,
      venue: this.state.venue,
    }

    console.log(addslot);

    //accessing backend url 
    axios.post('http://localhost:5000/esmsrouting/addslot', addslot)
    .then(res => {
      alert(res.data)
      this.onClear();
     
      window.location = '/adlist';
    })
    .catch(err => alert(err.data))
  }

  onClear(){
    this.setState({ 
      username: '',
      email:'',
      department: '',
      year: '',
      subject:'',
      date: '',
      session:'',
      venue: '',
    });
  }


  render() {
    return (
    <div>
       <Navbaradmin /> 
       {localStorage.getItem('adminstatus') !== 'active' ? (window.location = '/'):''}
       <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3 mb-3 shadow-lg ">
            <h3 style={{textAlign: 'center'}}>Exam Slot Schedule</h3>
            <br />

            <form onSubmit={this.onSubmit}>

            <div className="form-group">
                <label><b>Year: </b></label>
                <select 
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

              <div className="form-group"> 
                <label><b>Username: </b></label>
                <select ref="userInput"
                 required className="form-control" 
                 value={this.state.username}
                 onChange={this.onChangeUsername}>
                {
                  this.state.students.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
                 </select>
              </div>

              <div className="form-group"> 
                <label><b>Email: </b></label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail} readOnly= {true}
                    />
              </div>
          
              <div className="form-group">
                <label><b>Department: </b></label>
                <input 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.department}
                    onChange={this.onChangeDepartment} readOnly= {true}
                    />
              </div>
             
              <div className="form-group">
                <label><b>Subject: </b></label>
                <select 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.subject}
                    onChange={this.onChangeSubject}>
                    {
                    this.state.boxsubject.map(function(sub) {
                      return <option 
                        key={sub}
                        value={sub}>{sub}
                        </option>;
                    })
                  }  
                    </select>
                    
              </div>
              
              <div className="form-group">
                <label><b>Date:</b> </label>
                <div>
                  <DatePicker
                    required
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label><b>Session: </b></label>
                <select 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.session}
                    onChange={this.onChangeSession}>
                    {
                      this.state.boxsession.map(function(box) {
                        return <option 
                          key={box}
                          value={box}>{box}
                          </option>;
                      })
                    }
                    </select>                 
              </div>

              <div className="form-group">
                <label><b>Venue: </b></label>
                <select 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.venue}
                    onChange={this.onChangeVenue}>
                    {
                      this.state.boxvenue.map(function(box) {
                        return <option 
                          key={box}
                          value={box}>{box}
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