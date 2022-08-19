import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbaradmin from "../navbaradmin";


export default class Adedit extends Component{
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
      boxsession: ['','10:00 AM','2:00 PM'],
      boxvenue: ['','BLOCK-A','BLOCK-B','BLOCK-C','BLOCK-D'],
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
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

    //auot add data to fields
    axios.get('http://localhost:5000/esmsrouting/getslotbyid'+ localStorage.getItem('slotid'))
    .then(response => {
        var orgdate = new Date(response.data.data.date);
        orgdate.setDate(orgdate.getDate()-1);

      this.setState({
        username: response.data.data.username,
        email: response.data.data.email,
        department: response.data.data.department,
        year: response.data.data.year,
        subject: response.data.data.subject,
        date: new Date(orgdate),
        session: response.data.data.session,
        venue: response.data.data.venue,      
      })    
    })
    .catch(function (error) {
      console.log(error);
    })



     

  }

  //form submission
  onSubmit(e) {
    e.preventDefault();
    var orgdate = new Date(this.state.date);
    orgdate.setDate(orgdate.getDate()+1);

    const updateslot = {
      username: this.state.username,
      email: this.state.email,
      department: this.state.department,
      year: this.state.year,
      subject: this.state.subject,
      date: new Date(orgdate),
      session: this.state.session,
      venue: this.state.venue
    }

    console.log(updateslot);

    //accessing backend url 
    axios.post('http://localhost:5000/esmsrouting/updateslot'+localStorage.getItem('slotid'), updateslot)
    .then(res => {
      alert(res.data)
      localStorage.setItem('slotid','');
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
            <h3 style={{textAlign: 'center'}}>Exam Slot Updation</h3>
            <br />

            <form onSubmit={this.onSubmit}>

              <div className="form-group"> 
                <label><b>Username: </b></label>
                <input type="text"
                 required
                 className="form-control" 
                 value={this.state.username}
                 onChange={this.onChangeUsername} readOnly= {true}
                  /> 
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
                <label><b>Year: </b></label>
                <input 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.year}
                    onChange={this.onChangeYear} readOnly= {true}
                    />
              </div>

              <div className="form-group">
                <label><b>Subject: </b></label>
                <input 
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.subject}
                    onChange={this.onChangeSubject}
                    />
              </div>
              
              <div className="form-group">
                <label><b>Date: </b></label>
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
                <label><b>Venue:</b> </label>
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
                <input type="submit" value="Update" className="btn btn-dark" />
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

