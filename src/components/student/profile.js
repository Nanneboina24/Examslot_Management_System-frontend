import React, { Component } from 'react';
import Navbarstudent from "../navbarstudent";

export default class Profile extends Component{

    render() {
        return (
        <div>
           <Navbarstudent /> 
           {/* eliminates back navigation(button) and url navigation(through browser url) after logout */}
           {localStorage.getItem('studentstatus') !== 'active'? (window.location = '/'):''}
           <div className="row justify-content-center">
            <div className="col-md-6 ">
              <div className="card mt-3 mb-3 shadow-lg ">
                <h3 style={{textAlign: 'center'}}>Profile</h3>
               <br/>
                    <label style={{textAlign: 'center'}}><b>Username:</b>   {JSON.parse(localStorage.getItem('studentprofile')).username} </label>
                    <label style={{textAlign: 'center'}}><b>DOB:</b>        {JSON.parse(localStorage.getItem('studentprofile')).dob.substring(0,10)} </label>
                    <label style={{textAlign: 'center'}}><b>Email:</b>      {JSON.parse(localStorage.getItem('studentprofile')).email} </label>
                    <label style={{textAlign: 'center'}}><b>Password:</b>   {JSON.parse(localStorage.getItem('studentprofile')).password} </label>
                    <label style={{textAlign: 'center'}}><b>Department:</b> {JSON.parse(localStorage.getItem('studentprofile')).department} </label>
                    <label style={{textAlign: 'center'}}><b>Year:</b>       {JSON.parse(localStorage.getItem('studentprofile')).year} </label>
               
                </div>
            </div>
           </div>
        </div>
        )
      }
}