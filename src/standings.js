import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { server_url, get_left_color } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tabs, Tab, CircularProgress } from '@mui/material';
import {Paper} from '@mui/material';

import {ButtonTabs, SlotFixtures, TeamDisplay} from './schedule'



function SwissPointsTable({table, teams, stage_status, division, round}){
    console.log(table.map(x => {return {...x, team: teams[x.team_id]?.logo}}));
    table = table.map(x => {return {...x, team_name: teams[x.team_id]?.team_name, logo: teams[x.team_id]?.logo}})

    let status_dom = <div style={{textAlign:'center'}}>{stage_status === 'live' ? 'Ongoing' : (stage_status === 'pending' ? 'Pending' : 'Completed')} Round</div>


    let bg_col = get_left_color(division, round[0]) || 'rgb(177, 211, 222)';
    console.log(division, round)

    let table_dom = <Stack spacing='0' padding={2}>
        <Grid container padding={0} sx={{fontSize: 10, paddingBottom:'5px'}}>
                    <Grid item xs={5} sx={{textAlign:'center'}}>TEAM</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>MP</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>W</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>L</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>D</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>PTS</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>OPT</Grid>
                    <Grid item xs={1} sx={{textAlign:'center'}}>GD</Grid>
                </Grid>
        {table.map((row,i) => {
            return <Paper key={i} sx={{
                borderRadius: 0,
                borderBottom: '0.2px dotted grey',
                height: 30,
                fontSize: 12,
                background: bg_col,
                display:'flex',
                alignItems:'center'
            }}>
                <Grid container padding={0}>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{i+1}.</Grid>
                    <Grid item xs={4}>
                        <TeamDisplay team_id={row.team_id} team_name={row.team_name} logo={row.logo} team_name_size={10} logo_size={18}></TeamDisplay>
                    </Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.played}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.won}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.lost}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.drawn}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:800, fontSize: 12}}>{row.points}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.OPT}</Grid>
                    <Grid item xs={1} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.GD}</Grid>
                </Grid>
            </Paper>
        })}
    </Stack>


    return <div style={{color:'white', marginTop: '20px'}}>
        {status_dom}
        {table_dom}
    </div>

}

function BracketTable({table, teams, stage_status}){
    console.log(table.map(x => {return {...x, team: teams[x.team_id]?.logo}}));
    table = table.map(x => {return {...x, team_name: teams[x.team_id]?.team_name, logo: teams[x.team_id]?.logo}})

    let status_dom = <div style={{textAlign:'center'}}>{stage_status === 'live' ? 'Ongoing' : (stage_status === 'pending' ? 'Pending' : 'Completed')} Round</div>


    let table_dom = <Stack spacing='0' padding={0} sx={{width:'80%',marginLeft:'10%', marginTop:'20px'}}>
        <Grid container padding={0} sx={{fontSize: 10, paddingBottom:'5px'}}>
                    <Grid item xs={2} sx={{textAlign:'center'}}>RANK</Grid>
                    <Grid item xs={5} sx={{textAlign:'center'}}>TEAM</Grid>
                </Grid>
        {table.map((row,i) => {
            return <Paper key={i} sx={{
                borderRadius: 0,
                borderBottom: '0.2px dotted grey',
                height: 30,
                fontSize: 12,
                backgroundColor: row.rank === 0 ? 'rgb(194, 151, 52)' : row.rank===1 ? 'silver' : row.rank===2 ? 'rgb(148, 111, 52)' : 'white',
                display:'flex',
                alignItems:'center'
            }}>
                <Grid container padding={0}>
                    <Grid item xs={2} sx={{textAlign:'center', fontWeight:400, fontSize: 10}}>{row.rank+1}.</Grid>
                    <Grid item xs={5}>
                        <TeamDisplay team_id={row.team_id} team_name={row.team_name} logo={row.logo} team_name_size={10} logo_size={18}></TeamDisplay>
                    </Grid>
                </Grid>
            </Paper>
        })}
    </Stack>


    return <div style={{color:'white', marginTop: '20px'}}>
        {table_dom}
    </div>

}

function BracketView({data,table_type,table,teams,stage_status}){
    const [bracketTab, setBracketTab] = useState(0);

    let tab_element = <div style={{color:'white', marginTop: '30px'}}>
        <Tabs sx={{".Mui-selected":{color:'rgb(100,160,200)'}}} TabIndicatorProps={{
            style: {
            backgroundColor: "rgba(100,160,200,1)"
            }
        }} value={bracketTab} onChange={(e,i)=>{setBracketTab(i)}}>
            <Tab sx={{color:'white',width:'50%',fontFamily:'Poppins'}} label='Standings' />
            <Tab sx={{color:'white',width:'50%',fontFamily:'Poppins'}} label='Fixtures' />
        </Tabs>
    </div>

    return <div>
        {tab_element}
        {bracketTab === 0 && <BracketTable table={table} teams={teams} stage_status={stage_status}></BracketTable>}
        {bracketTab === 1 && <SlotFixtures heading={'Round Fixtures'} data={data} table_type={table_type}></SlotFixtures>}
    </div>
}



export default function Standings(){
    const [standings, setStandings] = useState({})
    const [teams, setTeams] = useState({})
    const [activeDivision, setActiveDivision] = useState() // O/W
    const [activePool, setActivePool] = useState();
    const [activeRound, setActiveRound] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        axios.get(
            `${server_url.DOMAIN}:${server_url.PORT}/standings`
        )
        .then(res => {
            console.log('fetched')
            setStandings({...res.data.standings});
            let team_dict = {}
            for(let team of res.data.teams){
                team_dict[team._id.toString()] = team;
            }
            setTeams(team_dict);
            // setStandings({...res.data.standings});
            // setFixtures([...res.data.fixtures]);

            console.log('fetched')
            console.log(res.data)
            // setActivePool('Swiss-A');
            // setActiveRound('O-SAR1');


            setDataLoaded(true);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    

    function activateDivision(division){
        localStorage.setItem(`schedule-div`,division);
        setActiveDivision(division)
        // let pool = Object.keys(standings[division])[0];
        // activatePool(pool);
    }

    function activatePool(pool){
        localStorage.setItem(`schedule-${activeDivision}`,pool);
        setActivePool(pool)
        // if(activeDivision in standings && pool in standings[activeDivision]){
        //     activateRound(Object.keys(standings[activeDivision][pool])[0])
        // }
    }

    function activateRound(round){
        localStorage.setItem(`schedule-${activeDivision}-${activePool}`,round);
        setActiveRound(round);
    }

    useEffect(() => {
        // console.log('USING EFFECT S',standings)
        if(Object.keys(standings).length === 0) return;
        let div = localStorage.getItem(`schedule-div`)
        activateDivision(div ? div : Object.keys(standings)[0]);
    }, [standings])

    useEffect(() => {
        // console.log('USING EFFECT D',activeDivision)
        
        if(Object.keys(standings).length === 0) return;
        if(activeDivision in standings === false) return;
        let pool = localStorage.getItem(`schedule-${activeDivision}`)
        activatePool(pool ? pool : Object.keys(standings[activeDivision])[0]);
    }, [standings,activeDivision])

    useEffect(() => {
        // console.log('USING EFFECT P',activePool)
        if(Object.keys(standings).length === 0) return;
        if(activeDivision in standings === false) return;
        if(activePool in standings[activeDivision] === false) return;

        let round = localStorage.getItem(`schedule-${activeDivision}-${activePool}`)
        activateRound(round ? round : Object.keys(standings[activeDivision][activePool])[0]);
    }, [standings,activeDivision,activePool])

    

    // if(activeDivision in standings === false){
    //     // console.log('wtf div')
    // }
    // else if(activePool in standings[activeDivision] === false){
    //     // console.log('wtf pool');
    // }
    // else if(activeRound in standings[activeDivision][activePool] === false){
    //     // console.log('wtf round')
    //     activateRound(Object.keys(standings[activeDivision][activePool])[0])
    // }
    // else{
    //     // console.log('all good', standings[activeDivision][activePool][activeRound], activeRound)
    // }
        

    let division_tabs = Object.keys(standings);
    let pool_tabs = []
    let round_tabs = []
    let table = []
    let sub_fixtures = [];
    let table_type = null
    let stage_status = null;
    if(activeDivision in standings){
        pool_tabs = Object.keys(standings[activeDivision]);
        if(activePool in standings[activeDivision]){
            round_tabs = Object.keys(standings[activeDivision][activePool])
            if(activeRound in standings[activeDivision][activePool]){
                console.log(standings[activeDivision][activePool][activeRound])
                table = standings[activeDivision][activePool][activeRound]?.info?.table;
                table_type = standings[activeDivision][activePool][activeRound]?.info?.type;
                stage_status = standings[activeDivision][activePool][activeRound]?.info?.status;
                sub_fixtures = standings[activeDivision][activePool][activeRound]?.fixtures
            }
        }
    }

    table.sort((r1,r2) => r1.rank-r2.rank)
    // console.log(table)

    // console.log(sub_fixtures)

    console.log('table type',table_type)


    if(!dataLoaded){
        return <div className='centered' style={{height:'100vh'}}>
                <CircularProgress/>
            </div>
    }


    let pending = <div>
        <div className='centered' style={{paddingTop:'20px',color:'white'}}>Waiting for previous rounds...</div>
        <div className='centered' style={{paddingTop:'20px',color:'white'}}><CircularProgress/></div>
    </div>

    let body = <div>
        {table_type === 'Swiss' && <div>
                <SwissPointsTable division={activeDivision} round={activeRound} teams={teams} table={table} stage_status={stage_status}/>
                <SlotFixtures heading={'Round Fixtures'} data={sub_fixtures} table_type={table_type}></SlotFixtures>
            </div>
        }

        {table_type === 'Bracket' && <BracketView table={table} teams={teams} stage_status={stage_status} data={sub_fixtures} table_type={table_type}></BracketView>}
    </div>



    return <div style={{marginTop: 80}}>
        <ButtonTabs tab_names={division_tabs} active_tab={activeDivision} activate_tab={activateDivision}></ButtonTabs>
        <ButtonTabs tab_names={pool_tabs} active_tab={activePool} activate_tab={activatePool} height={30} fontSize={12}></ButtonTabs>
        <ButtonTabs tab_names={round_tabs} active_tab={activeRound} activate_tab={activateRound} height={30} fontSize={11}></ButtonTabs>

        {stage_status !== 'pending' && body}
        {stage_status === 'pending' && pending}
    </div>
}