import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { getTeamLogo, server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs, CircularProgress } from '@mui/material';
import {Paper} from '@mui/material';

import { getImage, colors_gradient } from './globals';



export function ButtonTabs({tab_names, active_tab, activate_tab, display_func=x=>x, height=40, fontSize=15}){
    let num_buts = tab_names.length;
    // console.log('active tab:',active_tab)
    let grid_shadow = 
    <Grid container spacing={1} sx={{padding: 2, paddingBottom: 0, paddingTop: 0, zIndex: 1500}}>
        {tab_names.map((tab_name,i) => 
            <Grid key={i} item sx={{width: `${100/num_buts}%`}}>
                <Paper className='centered' elevation={10} sx={{
                    height: `${height}px`, 
                    borderRadius: '20px', 
                    border: '2px solid black',
                    boxShadow: 8,
                    backgroundColor: 'rgb(70, 151, 242)'
                    // backgroundColor: 'rgb(186, 174, 151)'
                }}>
                    {/* <div style={{width: '100%'}}>{display_func(tab_name)}</div> */}
                </Paper>
            </Grid>)
        }
    </Grid>

let grid = 
<Grid container spacing={1} sx={{padding: 2, marginTop: `${-height-35}px`, zIndex: 1400}}>
    {tab_names.map((tab_name,i) => 
        <Grid key={i} item sx={{width: `${100/num_buts}%`}}>
            <Paper className='centered' sx={{
                height: `${height}px`, 
                borderRadius: '20px', 
                border: '2px solid black',
                boxShadow: 8,
                backgroundColor: tab_names[i] !== active_tab ? 'rgba(250,250,250,1)' : 'rgba(100,160,200,1)',
                // backgroundColor: tab_names[i] !== active_tab ? 'rgba(250,250,250,1)' : 'rgba(173, 153, 116)',
                // boxShadow: '0px 4px rgb(70, 151, 242)'
            }}>
                <div className='centered' onClick={() => {activate_tab(tab_name)}} style={{width: '100%', height: '100%', fontSize: fontSize}}>{display_func(tab_name)}</div>
                {/* <button style={{width: '100%', height: '100%',opacity:0}}>{display_func(tab_name)}</button> */}
            </Paper>
        </Grid>)
    }
</Grid>

    // return <>{grid}</>;
    return <>{grid_shadow}{grid}</>;
}


export function TeamDisplay({team_name, logo, logo_size, team_name_size, rank, team_id, reverse=false, color='black', fw=400}){
    const navigate = useNavigate();

    if(!reverse)
    return <div style={{display: 'flex', alignItems:'center',fontSize:`${team_name_size}px`, fontWeight: fw, color:color}} onClick={()=>{if(team_id) navigate(`/team/${team_id}`)}}>
        <Box component="img" sx={{borderRadius: '50%'}} src={getTeamLogo(logo)} height={logo_size} width={logo_size}></Box>
        <div style={{overflow: "hidden", textOverflow: "ellipsis", paddingLeft: '8px', width: '80%', whiteSpace:'nowrap'}}> 
            {team_name}
            {rank !== undefined && <span style={{fontSize: `${team_name_size-2}px`, fontWeight: fw}}> [{rank+1}]</span>}
        </div>
    </div>

    else
    return <div style={{display: 'flex', alignItems:'center',fontSize:`${team_name_size}px`, fontWeight: fw, color:color}} onClick={()=>{navigate(`/team/${team_id}`)}}>
        <div style={{overflow: "hidden", textOverflow: "ellipsis", paddingRight: '8px', width: '80%', whiteSpace:'nowrap'}}> 
            {team_name}
            {rank !== undefined && <span style={{fontSize: `${team_name_size-2}px`, fontWeight: fw}}> [{rank+1}]</span>}
        </div>
        <Box component="img" sx={{borderRadius: '50%'}} src={getTeamLogo(logo)} height={logo_size} width={logo_size}></Box>
    </div>
}


export function SlotFixtures({heading,data,table_type='Swiss'}){

    
    console.log(data)
    let heading_dom = <div style={{textAlign:'center'}}>{heading}</div>

    function match_card_team_row(team_info, score, rank, loser=false){

        let color = loser ? 'rgb(0,0,0)' : 'black';
        let fw = loser ? 200 : 400;
        return <Grid container spacing={1}  sx={{padding: '3px'}}>
            <Grid item xs={10}>
                <TeamDisplay fw={fw} team_id={team_info?._id} color={color} rank={rank} team_name={team_info?.team_name || 'TBD'} logo={team_info?.logo || 'blank.webp'} logo_size={24} team_name_size={12}></TeamDisplay>
            </Grid>
            <Grid item xs={2} sx={{textAlign:'center',border:'0px solid'}} >
                <div className='centered' style={{
                    color: color,
                    fontSize: '14px',
                    fontWeight: fw
                }}>{score}</div>
            </Grid>
        </Grid>
    }

    console.log('table type:',table_type)

    let cards = <Stack spacing={2} padding={4} paddingTop={2}>
        {data.map((match, i) => {
            // if(match.status === 'placeholder') return;
            // console.log('making card',match)
                let match_rank = match.rank_1 + 1;
                let pos_str = ''
                switch(match_rank%10){
                    case 1: pos_str = `${match_rank}ST`;break;
                    case 2: pos_str = `${match_rank}ND`;break;
                    case 3: pos_str = `${match_rank}RD`;break;
                    default: pos_str = `${match_rank}TH`;break;
                }
                if(match_rank === 11) pos_str = '11TH';
                else if(match_rank === 12) pos_str = '12TH';
                else if(match_rank === 13) pos_str = '13TH';

                let bg_col = colors_gradient(match.stage.division, match.stage.stage_name[0]) || 'rgb(199, 163, 199)';

                let loser1 = false, loser2 = false; // whether team1 is the loser
                if(match.status === 'completed'){
                    if(match.result.outcome === 'W'){
                        loser2 = true;
                    }
                    else if(match.result.outcome === 'L'){
                        loser1 = true;
                    }
                }
                // bg_col = 'linear-gradient(to right, blue, green)'
                // console.log(bg_col)
                return <div key={i}>
                        {table_type === 'Bracket' && 
                            <div style={{color:'white', fontSize:'9px', fontWeight:600,padding:'5px'}}>
                                {match_rank && `${pos_str} PLACE MATCH`}
                            </div>
                        }
                        <Paper sx={{
                        // backgroundColor: bg_col,
                        background: bg_col,
                        border: '2px solid black',
                        borderRadius: '10px'
                    }}>
                        <Grid container direction="row" spacing={1} padding={1}>
                            <Grid item sx={{width: '67%'}}>
                                {match_card_team_row(match?.team_1, match.result.score_1 || '', match?.rank_1, loser1)}
                                {match_card_team_row(match?.team_2, match.result.score_2 || '', match?.rank_2, loser2)}
                            </Grid>
                            <Divider orientation="vertical" flexItem>
                            </Divider>
                            <Grid item sx={{width: '30%'}}>
                                <div className='centered' style={{flexDirection:'column'}}>
                                    <div style={{margin: '0', padding:'0',lineHeight:1.2}}>
                                        <span style={{fontSize: '9px', fontWeight:600}}>Match #{match.match_number}</span>
                                    </div>
                                    <div style={{margin: '0', padding:'0',lineHeight:1.2}}>
                                        <span style={{fontSize: '9px', fontWeight:300}}>{match.stage.division}: </span>
                                        <span style={{fontSize: '9px', fontWeight:500}}>{match.stage.stage_name}</span>
                                    </div>
                                    {/* <hr style={{margin: '0'}}></hr> */}
                                    <div style={{margin: '0', padding:'0',lineHeight:1.2}}>
                                        <span style={{fontSize: '9px', fontWeight:200}}>{match.start_time.slice(0,2)}:{match.start_time.slice(2,4)} </span>
                                        <span style={{fontSize: '9px', fontWeight:500}}>Field {match.field}</span>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            }
        )}
    </Stack>

    return <div style={{color:'white', marginTop: '15px'}}>{heading_dom}{cards}</div>

}

export default function Schedule(){
    const [activeDay, setActiveDay] = useState(1);
    const [dataLoaded, setDataLoaded] = useState(false);


    function activateDay(day){
        console.log('activating',day)
        setActiveDay(day);
    }
    // const [activeMode, setActiveMode] = useState('Time-wise');

    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        axios.get(
            `${server_url.DOMAIN}:${server_url.PORT}/fixtures`
        )
        .then(res => {
            setSchedule([...res.data])
            console.log(res.data)
            setDataLoaded(true);
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    if(!dataLoaded){
        return <div className='centered' style={{height:'100vh'}}>
                <CircularProgress/>
            </div>
    }

    var tables = [];
    var slots = {};
    var dayFixtures = schedule.filter(match => match.day==activeDay);

    // get all time-slot tables
    // [{heading, table_data}]
    for(let match of dayFixtures){
        if(match.start_time in slots == false)
            slots[match.start_time] = [];
        slots[match.start_time].push(match);
    }

    let sorted_slots = Object.keys(slots);
    sorted_slots.sort();
    for(let slot of sorted_slots){
        tables.push({
            heading: slot,
            table_data: slots[slot]
        })
    }

    console.log('TABLES',tables)
    


    return (
        <div style={{marginTop: 80}}>
            <ButtonTabs tab_names={[1,2,3]} active_tab={activeDay} activate_tab={setActiveDay} display_func={x => `Day ${x}`}></ButtonTabs>
            {/* <ButtonTabs tab_names={["A-R1","A-R2","A-R3","A-R4","A-R5"]} active_tab={"A-R4"} ></ButtonTabs> */}
            {/* <DivisionTab divisions={[1,2,3]} activeTab={activeDay} activateTab={setActiveDay} display_func={(x)=>`Day ${x}`}></DivisionTab> */}
            {/* <DivisionTab divisions={['Time-wise','Stage-wise']} activeTab={activeMode} activateTab={setActiveMode} top_offset={false}></DivisionTab> */}
            {/* <ScheduleTables tables={tables}></ScheduleTables> */}

            {tables.map((table, i) => {
                return <SlotFixtures key={i} heading={table.heading + ' hrs'} data={table.table_data}></SlotFixtures>
            })}
        </div>
    )
}