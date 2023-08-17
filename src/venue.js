import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { getImage, server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs } from '@mui/material';
import {Paper} from '@mui/material';

export default function Venue(){
    let img_height = window.innerHeight - 140;
    return <div>
        <div style={{marginTop: '80px', marginBottom: '20px'}} className='centered'>
            <a style={{color: 'lightblue'}} href='https://goo.gl/maps/NLuH5CSeHJNEPcKw5'>Gopalan Sports Academy - Maps Link</a>
        </div>
        <Grid container>
            <Grid item xs={12}>
                <div className='centered' style={{width:'100%',height:`${img_height}px`}}>
                    <img src={getImage('gopalan.png')} style={{height:'100%'}}></img>
                </div>
            </Grid>
        </Grid>
        
    </div>
}