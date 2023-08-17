import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { colonizeTime, getTeamLogo, get_left_color, server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs, CircularProgress } from '@mui/material';
import {Paper} from '@mui/material';

import { getImage, colors_gradient } from './globals';



export default function SpiritPending(){
    const [pending, setPending] = useState([])
    useEffect(() => {
        axios.get(`${server_url.URL}/spirit_pending`)
            .then(res => {
                setPending(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])


    return <div style={{marginTop: 70, color: 'white', padding: '30px', fontSize: 14, fontWeight: 400}}>
        <h3>Pending Spirit Scores:</h3>
        {pending.map((match,i) => {
            return <div key={i}>
                    <div>Match #{match.match_number}</div>
                    <div style={{color: match.team_1_submitted ? 'green' : 'red', float:'left'}}>{match.team_1}</div>
                    <div style={{float:'left', marginLeft: '5px', marginRight: '5px'}}> vs </div>
                    <div style={{color: match.team_2_submitted ? 'green' : 'red', float:'left'}}>{match.team_2}</div>
                    <br></br>
                    <br></br>
                </div>
        })}
    </div>
}