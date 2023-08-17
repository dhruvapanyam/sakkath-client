import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom'; 
import MenuAppBar from './navbar';
import Schedule from './schedule';
import Standings from './standings';
import LabelBottomNavigation from './bottombar';
import TeamDetails from './teamDetails';
import LandingPage from './landingPage';

import axios from 'axios';

// import {loadTokenHeader} from './utils/axios'
import {handleSignIn, handleSignOut, loadTokenHeader} from './utils/axios'
import { server_url, TESTING } from './globals'
import AdminView from './admin';
import TournamentSetup from './tournamentStructure';
import ScheduleChanges from './scheduleChanges';
import InfoView from './info';
import LoginPage from './login';
import Venue from './venue';
import RulesFormat from './rules';
import SpiritPending from './spirit_pending';
import SpiritData from './spirit_data';
import { CircularProgress } from '@mui/material';

export function login(){
    const username = window.prompt("Enter username");
    if(username === null) return;
    // const password = window.prompt("Enter password");
    // if(password === null) return;

    axios.post(
        `${server_url.URL}/signin`,
        {
            username,
            password: username // temporary
        }
    )
    .then(res => {
        // console.log(res.data);
        handleSignIn(res.data);
        window.location.reload();
    })
    .catch(err => {
        // console.log(err.response.data)
        if(err.response.data?.expired){
            handleSignOut();
        }
    })

    
}

export function logout(){
    axios.post(`${server_url.URL}/signout`)
    .then(res => {handleSignOut();window.location.reload()})
    .catch(
      // console.log
      )
}


function App() {

  loadTokenHeader();

  function phoneify(){
    // console.log(window.innerWidth, window.innerHeight);
    if(window.innerWidth / window.innerHeight <= 0.6) return;
    // target AspectRatio = 3:4
    let margins = window.innerWidth - window.innerHeight * 0.6;
    document.body.style.marginLeft = `${margins/2}px`;
    // document.getElementById('navbar').style.marginLeft = `${margins/2}px`;
    document.body.style.marginRight = `${margins/2}px`;
    document.getElementById('navbar').style.width = `${document.body.clientWidth}px`;

    // console.log(document.body.clientWidth)
  }
  useEffect(() => {
    phoneify();
    window.onresize = phoneify
  }, [])


  let admin = localStorage.getItem('my_role') === 'admin';

  console.log('Welcome to the Sakkath app!')

  if(TESTING){
    return <div className='centered' style={{height:'100vh', width:'100%',flexDirection:'column'}}>
    <CircularProgress></CircularProgress>
    <br></br>
    <div style={{color:'white'}}>Maintenance in progress :)</div>
  </div>
  }

  return (
    <>
    
      <Router>
      <div>
      <MenuAppBar></MenuAppBar>
      </div>
      <div>
        <Routes>
          <Route exact path='/' element={<LandingPage admin={admin}></LandingPage>}></Route>
          {/* <Route path='/teams' element={<TeamsView></TeamsView>}></Route> */}
          <Route path='/team/:id' element={<TeamDetails></TeamDetails>}></Route>
          <Route path='/standings' element={<Standings></Standings>}></Route>
          <Route path='/schedule' element={<Schedule></Schedule>}></Route>
          <Route path='/info' element={<InfoView></InfoView>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/venue' element={<Venue/>}></Route>
          <Route path='/rules' element={<RulesFormat/>}></Route>
          <Route path='/spirit_pending' element={<SpiritPending/>}></Route>


          { admin && <Route path='/admin' element={<AdminView></AdminView>}></Route> }
          { admin && <Route path='/setup' element={<TournamentSetup/>}></Route> }
          { admin && <Route path='/schedule_changes' element={<ScheduleChanges/>}></Route> }
          { admin && <Route path='/spirit_data' element={<SpiritData/>}></Route> }

          <Route path="*" element={<RedirectComponent></RedirectComponent>}></Route>

        </Routes>
      </div>
      {/* <LabelBottomNavigation></LabelBottomNavigation> */}
      </Router>
    </>
  );
}

function RedirectComponent(){
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  })

  return <></>
}

export default App;

