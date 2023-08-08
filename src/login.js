import sakkath_logo from './static/sakkath_logo.png'
import sample_logo from './static/team_logos/blank.webp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert, Button, Grid, Stack } from '@mui/material';
import { getImage } from './globals';

import { server_url } from './globals'
import {handleSignIn, handleSignOut, loadTokenHeader} from './utils/axios'
import { useState } from 'react';


export default function LoginPage(){
    const navigate = useNavigate();

    const [incorrect, setIncorrect] = useState(false)

    function login(username, password, navigate_to){
        axios.post(
            `${server_url.DOMAIN}:${server_url.PORT}/signin`,
            {
                username,
                password
            }
        )
        .then(res => {
            console.log(res.data);
            handleSignIn(res.data);
            // window.location.reload();
            navigate('/')

        })
        .catch(err => {
            setIncorrect(true);
            console.log(err.response.data)
            if(err.response.data?.expired){
                handleSignOut();
            }
        })
    }



    function handleLoginClick(){
        let username = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;

        if(!username || !password) return;

        login(username, password, -1);
    }

    function handleInputChange(){
        if(incorrect)
            setIncorrect(false);
    }

    let body = <Stack padding={2}>
        <div style={{color: 'rgb(53, 156, 211)', padding: '5px', letterSpacing: 2, fontWeight: 600, marginTop: 70}}>USERNAME</div>
        <Grid container>
            <Grid item xs={12}>
                <div style={{width:'100%'}}>
                    <input onChange={handleInputChange} id='login-username' spellCheck={false} className='login-input'></input>
                </div>
            </Grid>
        </Grid>
        <div style={{marginTop:'20px',color: 'rgb(53, 156, 211)', padding: '5px', letterSpacing: 2, fontWeight: 600}}>PASSWORD</div>
        <Grid container>
            <Grid item xs={12}>
                <div style={{width:'100%'}}>
                    <input onChange={handleInputChange} id='login-password' type='password' className='login-input'></input>
                </div>
            </Grid>
        </Grid>

        <div className='centered' style={{width:'100%', marginTop:'30px'}}>
            <Button onClick={handleLoginClick}
             sx={{width:'100%', height: '45px', fontFamily:'Poppins', fontWeight:400, borderRadius: '10px', backgroundColor: 'rgb(53, 156, 211)'}} variant='contained'>Login</Button>
        </div>
        <br></br>
        {incorrect && <Alert severity='error' variant='filled'>Incorrect username or password!</Alert>}

        <img src={getImage('white_logo.png')} style={{width:'100%', marginTop: '20px'}}></img>
    </Stack>

    return <div>
        {body}
    </div>
}