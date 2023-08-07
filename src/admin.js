import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { getImage } from './teamDetails'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs } from '@mui/material';
import {Paper} from '@mui/material';

import {LandingCard} from './landingPage';

export default function AdminView(){
    return <div style={{marginTop:70}}>
        {/* <img src={getImage('white_logo.png')} style={{width:'100%'}}></img> */}
        <Grid container paddingRight={2}>
            {[{
                title:"Tournament Setup",
                href:"/setup"
            },
            // {
            //     title:"Alerts",
            //     href:""
            // },
            {
                title:"Schedule Changes",
                href:"/schedule_changes"
            },
            // {
            //     title:"Misc",
            //     href:""
            // },
            ].map((val,i) => {
                return <LandingCard key={i} value={val}></LandingCard>
            })}
            
        </Grid>
    </div>
}