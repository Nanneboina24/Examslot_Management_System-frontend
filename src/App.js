import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login.component";
import Signup from "./components/signup";
import Adlist from "./components/admin/adlist";
import Adcreate from "./components/admin/adcreate";
import Adedit from "./components/admin/adedit"
import Examslots from './components/student/examslots';
import Profile from "./components/student/profile"

//function based component
function App() {
  return (
    <Router>
      <div className="container">

        {/* deploying Navbarhome component here */}
        {/* <Navbarhome />  */}

        {/* <br/> */}
       {/* Navigation urls declaring in App.js, when url calls corresponding component deployed here 
       both url declaring and deploying taking place here  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adlist" element={<Adlist />} />
          <Route path="/adschedule" element={<Adcreate />} />
          <Route path="/adedit" element={<Adedit />} />
          <Route path="/stuslots" element={<Examslots />} />
          <Route path="/stuprofile" element={<Profile />} />
         
        
        </Routes>

      </div>
    </Router>
  );
}

export default App;
