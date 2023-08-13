import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs } from '@mui/material';
import {Paper} from '@mui/material';


import { getImage, getTeamLogo } from './globals';

export function LandingCard({value}){
    const navigate = useNavigate();
    return <Grid item xs={6} padding={2}>
                <div style={{width:'100%',aspectRatio:1, color: 'black',backgroundColor: 1 ? 'white' : 'rgb(227, 109, 172)', background: 'linear-gradient(120deg, white 0%, rgb(227, 109, 172) 70%)', borderRadius:'20px', border:'2px solid black', boxShadow:'10px 10px rgb(28, 147, 214)'}}>
                    <div className='centered' onClick={()=>{navigate(value.href)}} style={{height:'100%'}}>
                        {value.title}
                    </div>
                </div>
            </Grid>
}

export default function LandingPage({admin}){


    let views = [{
            title:"Fixtures",
            href:"/schedule"
        },
        {
            title:"Standings",
            href:"/standings"
        },
        {
            title:"Format",
            href:""
        },
        {
            title:"Venue",
            href:""
        },
    ]

    if(admin) views.push(
        {
            title:"Admin",
            href:"/admin"
        }
    )

    return <div style={{marginTop:70}}>
        <img src={getImage('white_logo.png')} style={{width:'100%'}}></img>
        <Grid container paddingRight={2}>
            {views.map((val,i) => {
                return <LandingCard key={i} value={val}></LandingCard>
            })}
            
        </Grid>
    </div>
}