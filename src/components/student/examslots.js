import React, { Component } from 'react';
import axios from 'axios';
import Navbarstudent from "../navbarstudent";
import { jsPDF } from 'jspdf' ;
import html2canvas from 'html2canvas';
import { BsFillArrowDownCircleFill } from "react-icons/bs";

//function based component
const Slot = props => (
  <tr>
    <td>{props.detail.username}</td>
    <td>{props.detail.email}</td>
    <td>{props.detail.department}</td>
    <td>{props.detail.year}</td>
    <td>{props.detail.subject}</td>
    <td>{props.detail.date.substring(0,10)}</td>
    <td>{props.detail.session}</td>
    <td>{props.detail.venue}</td>
  </tr>
)

export default class Examslots extends Component{
  constructor(props) {
    super(props);
    this.state = {
      slotdetails: [],
      slotstatus:''
    };
  }


  componentDidMount() {
    const data={
      email: JSON.parse(localStorage.getItem('studentprofile')).email
    }
    axios.post('http://localhost:5000/esmsrouting/slotstudent',data)
      .then(res => {
        if(res.data.success) {
          this.setState({ slotdetails: res.data.data })
        }
        else{
          this.setState({ slotstatus: 'unavailable' })
          // alert(res.data.message);
        }
      
      })
      .catch((error) => {
        console.log(error);
      })
  }

  slotlist() {
    return this.state.slotdetails.map(current => {
      return <Slot detail={current} key={current._id}/>;
    })
  }

  generatePDF(){
    let element= document.getElementById('slotsid');

    html2canvas(element).then(canvas => {
    // Few necessary setting options
    var imgWidth = 200;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')

    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 20;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)
    pdf.setTextColor(0,100,0);
    pdf.setFontSize(20);
    pdf.setFont("bold");
    pdf.save('slot.pdf'); // Generated PDF
    });


  }



  render() {
    return (
      <div>
        <Navbarstudent />
        <br />
        <div>
        <BsFillArrowDownCircleFill style={{color: 'black', fontSize: '30px',float: 'right',cursor: 'pointer'}} onClick={this.generatePDF} />
        </div>

        {localStorage.getItem('studentstatus') !== 'active'? (window.location = '/'):''}
        {this.state.slotstatus === 'unavailable'? (window.location = '/stuprofile'):''}
        <div id="slotsid">
        <h3 style={{textAlign: 'center'}}>Exam Slot Details</h3>
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Department</th>
              <th>Year</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Session</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            { this.slotlist() }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}