import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillEaselFill } from "react-icons/bs";

export default class Navbaradmin extends Component {
  logout(){
    localStorage.setItem('slotid','');
    localStorage.setItem('adminstatus','out');
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark  navbar-expand-lg " >
        <BsFillEaselFill style={{color: 'white', fontSize: '22px'}}/>
        <Link to="/" className="navbar-brand ">Exam_SMS</Link>
        
        <div className="collpase navbar-collapse " >
        <ul className="navbar-nav mr-auto" style={{ marginLeft: 'auto'}}>
          <li className="navbar-item ">
              {/* url navigation */}
             <Link to="/adlist" className="nav-link" >List</Link> 
          </li>
          <li className="navbar-item">
             <Link to="/adschedule" className="nav-link" >Schedule</Link>
          </li>
          <li className="navbar-item">
             <Link to="/" className="nav-link" onClick={this.logout}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}