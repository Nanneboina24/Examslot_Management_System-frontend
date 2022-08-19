import React, { Component } from 'react';
import axios from 'axios';
import Navbarhome from "./navbarhome.component";
import { BsFillEnvelopeFill, BsShieldLockFill} from "react-icons/bs";

export default class Login extends Component{
  constructor(props) {
    super(props);

    //binding functions to this class Signup component  
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);

    //state object used for variable declarartins in component
    this.state = { 
      email:'',
      password: ''
    }
  }

   //state variable updation functions
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

  onSubmit(e) {
    e.preventDefault();
   if(this.state.email === 'admin@gmail.com' && this.state.password ==='admin123')
   {
    alert("Admin Login Successfull");
    localStorage.setItem('adminstatus','active');
    window.location = '/adlist';
   }else{
        const checkuser = {
          email: this.state.email,
          password: this.state.password,
        }

        console.log(checkuser);

        //accessing backend url 
        axios.post('http://localhost:5000/esmsrouting/usercheck', checkuser)
          .then(res => {
            console.log(res);
            if(res.data.success) {
              alert(res.data.message);

              //setting/getting data to localStorage
              localStorage.setItem('studentstatus','active');
              localStorage.setItem('studentprofile',JSON.stringify(res.data.data[0]));
              console.log(JSON.parse(localStorage.getItem('studentprofile')));

            //navigation between components
            window.location = '/stuprofile';
            }
            else{
              alert(res.message);
            }
          })
          .catch(err => alert(err.data))
    }
  
  }

  
  onClear(){
    this.setState({ 
      email:'',
      password: ''
    });
  }



render() {
    return (
    <div>
       <Navbarhome /> 
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3 mb-3 shadow-lg ">
              <h3 style={{textAlign: 'center'}}>Login</h3>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                   <BsFillEnvelopeFill style={{fontSize: '20px'}}/>
                  <label><b> Email:</b> </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <br />
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