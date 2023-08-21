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
                <div style={{width:'100%', aspectRatio:1, color: 'black',backgroundColor: 1 ? 'white' : 'rgb(227, 109, 172)', background: 'linear-gradient(120deg, white 0%, rgb(227, 109, 172) 70%)', borderRadius:'20px', border:'2px solid black', boxShadow:'10px 10px rgb(28, 147, 214)'}}>
                {/* <div style={{width:'100%', aspectRatio:1, color: 'black',backgroundColor: 1 ? 'white' : 'rgb(227, 109, 172)', background: 'linear-gradient(120deg, white 0%, rgb(245, 188, 224) 0%)', borderRadius:'20px', border:'2px solid black', boxShadow:'10px 10px rgb(100, 163, 189)'}}> */}
                    <div className='centered' onClick={()=>{
                            if(value?.type === 'external') 
                                window.open(value.href, '_blank')
                            else 
                                navigate(value.href);
                            }} 
                        style={{height:'100%'}}>
                            {value.title}
                    </div>
                </div>
            </Grid>
}

function SponsorBand(){

    return <Grid container sx={{backgroundColor:'white'}}>
        <Grid item sx={{width:'20%'}}>
            <div className='centered sponsor-img-div'><img className='sponsor-img' style={{width: '80%'}} src={getImage('sponsors/decathlon.jpeg')}></img></div>
        </Grid>
        <Grid item sx={{width:'20%'}}>
            <div className='centered sponsor-img-div'><img className='sponsor-img' src={getImage('sponsors/gatorade.jpeg')}></img></div>
        </Grid>
        <Grid item sx={{width:'20%'}}>
            <div className='centered sponsor-img-div'><img className='sponsor-img' src={getImage('sponsors/offseason.png')}></img></div>
        </Grid>
        <Grid item sx={{width:'20%'}}>
            <div className='centered sponsor-img-div'><img className='sponsor-img' src={getImage('sponsors/peak.jpeg')}></img></div>
        </Grid>
        <Grid item sx={{width:'20%'}}>
            <div className='centered sponsor-img-div'><img className='sponsor-img' src={getImage('sponsors/urbanwear.jpeg')}></img></div>
        </Grid>
        
        
    </Grid>
}

export default function LandingPage({admin}){


    let views = [
        {
            title:"Photos",
            href:"https://www.google.com",
            type:'external'
        },
        {
            title:"Standings",
            href:"/standings"
        },
        
        {
            title:"Schedule",
            href:"/schedule"
        },
        {
            title:"Rules",
            href:"/rules"
        },
        {
            title:"Venue",
            href:"/venue"
        },
    ]

    if(admin) views.push(
        {
            title:"Admin",
            href:"/admin"
        }
    )

    return <div style={{marginTop:70}}>
        <img src={getImage('white_logo.png')} style={{width:'80%', marginLeft:'10%'}}></img>
        <Grid container paddingRight={2}>
            {views.map((val,i) => {
                return <LandingCard key={i} value={val}></LandingCard>
            })}
            
        </Grid>
        <br></br>
        <br></br>
        <SponsorBand></SponsorBand>
    </div>
}