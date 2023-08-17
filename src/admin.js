import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs } from '@mui/material';
import {Paper} from '@mui/material';

import {LandingCard} from './landingPage';

export default function AdminView(){
    return <div style={{marginTop:70}}>
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
            {
                title:"Spirit Data",
                href:"/spirit_data"
            },
            ].map((val,i) => {
                return <LandingCard key={i} value={val}></LandingCard>
            })}
            
        </Grid>
    </div>
}