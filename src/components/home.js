import React, { Component } from 'react';
import Navbarhome from "./navbarhome.component";


export default class Home extends Component{
render() {
    return (
      <div className="container">
          <Navbarhome /> 
          
          <br />
      <div>
        <h3 style={{textAlign: 'center'}}>Welcome To Exam Slot Management System!</h3>
      </div>
    </div>
    )
  }
}