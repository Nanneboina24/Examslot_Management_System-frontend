import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbaradmin from "../navbaradmin";


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
    <td>
    <Link to="/adedit" style={{color:'green'}} onClick={() => { props.slotid(props.detail._id) }}><b>Edit</b></Link> | <a href='#' style={{color:'red'}} onClick={() => { props.deleteSlot(props.detail._id) }}><b>Delete</b></a>
    </td>
  </tr>
)

export default class Adlist extends Component{
  constructor(props) {
    super(props);
    this.deleteSlot = this.deleteSlot.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.state = {
      slotdetails: [],
      search:''
    };
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
     
    if(e.target.value === ''){
      axios.get('http://localhost:5000/esmsrouting/getslotlist')
      .then(res => {
        if(res.data.success) {
          this.setState({ slotdetails: res.data.data.sort((a, b) => a.year > b.year ? 1 : -1) })
        
        }
        else{
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })

    }
    else{
      //getting data based on year
      const data={
        year:e.target.value
      }
      axios.post('http://localhost:5000/esmsrouting/getyearslotlist',data)
      .then(res => {
        if(res.data.success) {
          this.setState({ slotdetails: res.data.data.sort((a, b) => a.username > b.username ? 1 : -1) })
        }
        else{
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  }

  

  componentDidMount() {
    axios.get('http://localhost:5000/esmsrouting/getslotlist')
      .then(res => {
        if(res.data.success) {
          this.setState({ slotdetails: res.data.data.sort((a, b) => a.year > b.year ? 1 : -1) })
        
        }
        else{
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  slotlist() {
    return this.state.slotdetails.map(current => {
      return <Slot detail={current} deleteSlot={this.deleteSlot} slotid={this.slotid} key={current._id}/>;
    })
  }

  deleteSlot(id) {
    axios.delete('http://localhost:5000/esmsrouting/slotdelete'+id)
      .then(response => { console.log(response.data)})
      .catch(error => { console.log(error.message)})

    this.setState({
      slotdetails: this.state.slotdetails.filter(es => es._id !== id)
    })
  }

  slotid(id){
    localStorage.setItem('slotid',id);
  }


  render() {
    return (
      <div>
        <Navbaradmin />
        <br />
     
        <form>
        <div className="form-group" style={{color: 'black',float: 'right'}}> 
          <label><b> Filter:  </b></label>
          <input type="text" classname="form-control" 
          value={this.state.search}
          onChange={this.onChangeSearch} />
        </div>
        </form>
       

      {localStorage.getItem('adminstatus') !== 'active' ? (window.location = '/'):''}
        <h3 style={{textAlign: 'center'}}>Exam Slot List</h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.slotlist() }
          </tbody>
        </table>
      </div>
    )
  }
}