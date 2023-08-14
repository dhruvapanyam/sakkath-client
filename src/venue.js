import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { getImage, server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs } from '@mui/material';
import {Paper} from '@mui/material';

export default function Venue(){
    let img_height = window.innerHeight - 60;
    return <div>
        <Grid container>
            <Grid item xs={12}>
                <div className='centered' style={{width:'100%',height:`${img_height}px`}}>
                    <img src={getImage('venue.jpg')} style={{height:'100%',paddingTop:'110px'}}></img>
                </div>
            </Grid>
        </Grid>
    </div>
}