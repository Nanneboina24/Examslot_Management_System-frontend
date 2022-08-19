import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillEaselFill } from "react-icons/bs";

export default class Navbarstudent extends Component {

  logout(){
    localStorage.setItem('studentstatus','out');
    localStorage.setItem('studentprofile','');
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark  navbar-expand-lg " >
        <BsFillEaselFill style={{color: 'white', fontSize: '22px'}}/>
        <Link to="/" className="navbar-brand ">Exam_SMS</Link>
        
        <div className="collpase navbar-collapse " >
        <ul className="navbar-nav mr-auto" style={{ marginLeft: 'auto'}}>
          <li className="navbar-item ">
             <Link to="/stuslots" className="nav-link" >Slots</Link> 
          </li>
          <li className="navbar-item">
             <Link to="/stuprofile" className="nav-link" >Profile</Link>
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