import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillEaselFill } from "react-icons/bs";



export default class Navbarhome extends Component {

  render() {  
    return (
      <nav className="navbar navbar-dark bg-dark  navbar-expand-lg " >  
      <BsFillEaselFill style={{color: 'white', fontSize: '24px'}}/>
     <Link to="/" className="navbar-brand "> Exam_SMS</Link>
        
        <div className="collpase navbar-collapse " >
        <ul className="navbar-nav ml-auto" style={{ marginLeft: 'auto'}} >
          <li className="nav-item ">
              {/* url navigation */}
             <Link to="/login" className="nav-link" >Login</Link> 
          </li>
          <li className="nav-item">
             <Link to="/signup" className="nav-link" >Signup</Link>
          </li>
        </ul>
       </div>
      </nav>
    );
  }
}