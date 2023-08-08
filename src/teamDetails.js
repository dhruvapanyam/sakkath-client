import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { server_url, colors_gradient, get_left_color, getTeamLogo } from './globals';
import { Grid, Typography, Stack, Divider, Box, IconButton, Button, Alert } from '@mui/material';
import {Paper} from '@mui/material';
import Modal from '@mui/material/Modal';

import {ButtonTabs, SlotFixtures, TeamDisplay} from './schedule'
import { handleError } from './utils/axios';


function TeamOverview({teamData}){
    // console.log(teamData)
    // console.log(teamData)
    const logo = getTeamLogo(teamData?.team_data?.logo)
    // console.log(logo)

    const record = teamData?.record
    // console.log('record',teamData)
    var recent_record = teamData?.form || [];
    // recent_record = [true,false,true]
    const form_colors = {'U': 'white', 'W': 'green', 'L': 'red', 'D': 'grey'}
    var form_symbols = recent_record.join('').padEnd(7, 'U').split('');
    console.log(form_symbols);;


    return <Grid container padding={1} spacing={0} sx={{marginTop: '58px', color:'white', backgroundColor:'rgb(20,20,20)'}}>
        <Grid item sx={{border:'', width:'40%', padding:'10px',}}>
            <Box component={'img'} sx={{width: '100%',aspectRatio:'1', borderRadius:'50%', border:'2px solid grey'}} src={logo}></Box>
        </Grid>
        <Grid item sx={{border:'', width:'60%'}}>
            <Box className='centered' sx={{flexDirection:'column', height: '100%'}}>
                <div style={{fontSize:'20px',fontWeight:500, textAlign:'center'}}>{teamData?.team_data?.team_name}</div>
                <div style={{fontSize:'13px', fontWeight:200}}>
                    {teamData?.team_data?.division}: {teamData?.team_data?.current_stage_id?.stage_name}: Rank {teamData?.team_data?.stage_rank+1}
                </div>
                <br></br>
                <div style={{fontSize:'13px', fontWeight:200}}>Record</div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    {form_symbols.map((c,i) => {
                        return <div key={i} style={{backgroundColor: form_colors[c], borderRadius: '50%', height: '8px',width:'8px', margin:'1px'}}></div>
                    })}
                </div>
            </Box>
        </Grid>
    </Grid>

    // return (<>
    //     <div className='team-overview-container'>
    //         <div className='team-overview-logo'>
    //             <img src={logo} alt="team logo" className="team-overview-logo-img"></img>
    //         </div>
    //         <div className='team-overview-metadata'>
    //             <div className='team-overview-metadata-name'>{teamData?.team_data?.team_name}</div>
    //             <div className='team-overview-metadata-rank'>{teamData?.team_data?.division}: {teamData?.team_data?.current_stage_id?.stage_name}: Rank {teamData?.team_data?.stage_rank+1}</div>
    //             <div className='team-overview-metadata-record'>Record: {record?.W}W / {record?.L}L / {record?.D}D</div>
    //             <div className='team-overview-metadata-record'>Recent Form: <div style={{display: 'inline-block'}}>{form}</div></div>
    //             <div className='team-overview-metadata-record'></div>
    //         </div>
    //     </div>
    // </>)
}

function TeamUpcoming({id, teamInfo}){
    let fixture = teamInfo?.upcoming;
    console.log('upcoming',fixture)
    var fixture_details;
    if(fixture === null){
        let msg = teamInfo?.team_data?.current_stage_id?.type != 'Swiss' ? 'N/A' : `Waiting for results of ${teamInfo?.team_data?.current_stage_id?.stage_name}...`
        fixture_details = <div className='next-fixture-details' style={{paddingTop: '27px'}}>{msg}</div>
    }
    else{
        fixture_details = <div className='next-fixture-details'>
        <div style={{paddingTop: '12px'}} className='next-fixture-row'>vs. <b>{fixture?.team_1?._id === id ? fixture?.team_2?.team_name : fixture?.team_1?.team_name}</b></div>
        <hr style={{margin: 0, padding: 0, width: '50%', textAlign:'center',alignItems:'center'}}></hr>
        <div style={{paddingTop: '5px'}} className='next-fixture-row'><b>{fixture?.start_time} Field-{fixture?.field}</b> | {fixture?.stage?.stage_name}</div>
    </div>
    }
    console.log('fixture',fixture)
    const opp = fixture?.team_1?._id === id ? fixture?.team_2 : fixture?.team_1;


    let waiting_dom = <div className='centered' style={{height:'100%', fontSize:'14px'}}>
        Waiting for results of {teamInfo?.team_data?.current_stage_id?.stage_name}...
    </div>

    let upcoming_dom = <Grid container sx={{height:'100%'}}>
                            <Grid item xs={2}>
                                <div className='centered' style={{fontSize:14, height:'100%'}}>vs</div>
                            </Grid>
                            <Divider orientation='vertical' flexItem></Divider>
                            <Grid item xs={9}>
                                <Stack sx={{width:'100%'}} padding={1} spacing={1}>
                                    <div className='centered'>
                                        <TeamDisplay team_id={opp?._id} team_name={opp?.team_name} logo={opp?.logo} team_name_size={12} logo_size={20} rank={fixture?.team_1?._id === id ? fixture?.rank_2 : fixture?.rank_1}></TeamDisplay>
                                    </div>
                                    <hr></hr>
                                    <div className='centered' style={{fontSize:11}}>
                                        {fixture?.stage?.stage_name}&nbsp; &nbsp;|&nbsp; &nbsp;Day {fixture?.day}&nbsp; &nbsp;|&nbsp; &nbsp;{fixture?.start_time} hrs&nbsp; &nbsp;|&nbsp; &nbsp;Field-{fixture?.field}
                                    </div>
                                    
                                </Stack>
                            </Grid>
                        </Grid>


    let bg_col = colors_gradient(teamInfo?.team_data?.current_stage_id?.division, teamInfo?.team_data?.current_stage_id?.stage_name[0], 'to right') || 'white';
    // bg_col = 'white';
    return (<div style={{color:'white',marginTop:'15px'}}>
                <div style={{textAlign:'center'}}>Next Fixture</div>
                <Box padding={2}>
                    <Paper elevation={16} sx={{background:bg_col, height:'70px', borderRadius:'25px'}}>
                        {fixture === null ? waiting_dom : upcoming_dom}
                    </Paper>
                </Box>
            </div>
    )
}


function TeamResults({results, id, own_team=false}){

    results.sort((r1,r2) => (r2.match_number > r1.match_number) ? 1 : -1);
    // console.log(results)
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'beige',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontFamily: 'Poppins',
    };
    

    const [open, setOpen] = useState(false)
    const [openResult, setOpenResult] = useState(0)
    const handleOpen = (i) => {
        if(!own_team) return;
        setOpenResult(i);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const oppRoster = () => {
        if(results.length === 0) return []
        let res = results[openResult];
        if(res.team_1._id === id)
            return res.team_2.roster;
        return res.team_1.roster
    }

    const submitSpiritScore = () => {
        let mvp = document.getElementById(`${openResult}-mvp`).value;
        let msp = document.getElementById(`${openResult}-msp`).value;
        let comments = document.getElementById(`${openResult}-comments`).value;

        let s1 = [`${openResult}-spirit_1-1`,`${openResult}-spirit_1-2`,`${openResult}-spirit_1-3`,`${openResult}-spirit_1-4`,`${openResult}-spirit_1-5`].map(id => document.getElementById(id)?.value || 0).map(x=>parseInt(x));
        let s2 = [`${openResult}-spirit_2-1`,`${openResult}-spirit_2-2`,`${openResult}-spirit_2-3`,`${openResult}-spirit_2-4`,`${openResult}-spirit_2-5`].map(id => document.getElementById(id)?.value || 0).map(x=>parseInt(x));

        console.log(s1, s2, mvp, msp, comments)

        axios.post(
            `${server_url.DOMAIN}:${server_url.PORT}/spirit_score/${results[openResult]._id}`,
            {
                spirit_score_1: s1,
                spirit_score_2: s2,
                mvp,
                msp,
                comments
            }
        )
            .then(res => {
                console.log('submitted!');
                window.location.reload();
            })
            .catch(err => {
                console.log(err.response.data)
            })

    }

    return <div style={{color:'white'}}>
        <div style={{textAlign:'center'}}>Results</div>
        <Stack padding={2} spacing={1}>
            {results.map((result,i) => {
                let outcome;
                if(result.result.outcome === 'D'){
                    // console.log('hre1')
                    outcome = 'D'
                }
                else if(result.team_1._id.toString() === id){
                    // console.log('hre2')
                    outcome = result.result.outcome
                }
                else if(result.team_2._id.toString() === id){
                    // console.log('hr3e')
                    outcome = result.result.outcome === 'W' ? 'L' : 'W'
                }

                const outcome_colors = {'W': 'green','L': 'red','D': 'grey'}

                let bg_col = get_left_color(result.stage.division, result.stage.stage_name[0], 'to right') || 'white';
                bg_col = 'white';

                const max_team_name_length = 15;
                let team_1_name = result.team_1.team_name;
                if(team_1_name.length > max_team_name_length){
                    team_1_name = team_1_name.slice(0,max_team_name_length) + '...'
                }
                let team_2_name = result.team_2.team_name;
                if(team_2_name.length > max_team_name_length){
                    team_2_name = team_1_name.slice(0,max_team_name_length) + '...'
                }

                // return <div><Paper key={i} elevation={16} sx={{backgroundColor: outcome ? 'rgb(124, 176, 114)' : 'rgb(181, 121, 118)', height:'110px'}}>
                return <div key={i}><Paper key={i} elevation={16} sx={{background: bg_col, boxShadow:`0px 5px ${outcome_colors[outcome]}`}}>
                            <Stack padding={1}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <div style={{float:'right'}}>
                                        <TeamDisplay reverse={true} team_name={team_1_name} logo={result.team_1.logo} team_id={result.team_1._id} logo_size={20} team_name_size={12}></TeamDisplay>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className='centered'>
                                            {result.result.score_1}-{result.result.score_2}
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TeamDisplay team_name={result.team_2.team_name} logo={result.team_2.logo} team_id={result.team_2._id} logo_size={20} team_name_size={12}></TeamDisplay>
                                    </Grid>
                                </Grid>
                                {/* <hr color='lightgrey' style={{width:'70%', border:'none',height:'1px'}}></hr>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div style={{float:'right', fontSize:'11px', fontWeight:300}}>
                                            {result.spirit.spirit_score_1.join(' | ')}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className='centered' style={{fontSize:'13px'}}>
                                            SPIRIT
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{fontSize:'11px', fontWeight:300}}>
                                            {result.spirit.spirit_score_2.join(' | ')}
                                        </div>
                                    </Grid>
                                </Grid> */}
                                <hr color='lightgrey' style={{width:'70%', border:'none',height:'1px'}}></hr>
                                <Grid container onClick={()=>{handleOpen(i)}}>
                                    <Grid item xs={12}>
                                        <div className='centered' style={{fontSize:11}}>
                                            {result?.stage?.stage_name}&nbsp; &nbsp;|&nbsp; &nbsp;Day {result?.day}&nbsp; &nbsp;|&nbsp; &nbsp;{result?.start_time} hrs&nbsp; &nbsp;|&nbsp; &nbsp;Field-{result?.field}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Paper>
                        {/* <div className='centered' style={{marginTop:'5px'}}><Button sx={{fontSize:8}} variant='contained' color='primary'>submit spirit score</Button></div> */}


                        
                        </div>
            })}
        </Stack>
        <Modal
              open={open}
              onClose={()=>{handleClose()}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

            >
              <Box sx={style}>
                <Typography sx={{fontWeight:700, fontSize:15, fontFamily:'Poppins'}} id="modal-modal-title" variant="h6" component="h2">
                  Submit Spirit Scores [Match #{results[openResult]?.match_number}]
                </Typography>
                <Stack padding={3} spacing={1}>
                    <Grid container>
                        <Grid item xs={9}>
                            <TeamDisplay team_name={results[openResult]?.team_1?.team_name} logo={results[openResult]?.team_1?.logo} logo_size={20} team_name_size={12}></TeamDisplay>
                        </Grid>
                        <Grid item xs={3}>
                            <div className='centered' style={{height:'100%'}}>
                                <input id={`${openResult}-spirit_1-1`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_1-2`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_1-3`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_1-4`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_1-5`} type={'number'} min={0} max={4} defaultValue={2}></input>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9}>
                            <TeamDisplay team_name={results[openResult]?.team_2?.team_name} logo={results[openResult]?.team_2?.logo} logo_size={20} team_name_size={12}></TeamDisplay>
                        </Grid>
                        <Grid item xs={3}>
                        <div className='centered' style={{height:'100%'}}>
                                <input id={`${openResult}-spirit_2-1`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_2-2`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_2-3`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_2-4`} type={'number'} min={0} max={4} defaultValue={2}></input>
                                <input id={`${openResult}-spirit_2-5`} type={'number'} min={0} max={4} defaultValue={2}></input>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container paddingTop={2}>
                        <Grid item xs={9}>
                            MVP:
                        </Grid>
                        <Grid item xs={3}>
                        <div className='centered' style={{height:'100%'}}>
                                <select id={`${openResult}-mvp`}>
                                    <option value={'N/A'}>-</option>
                                    {oppRoster().map((player,i) => {
                                        return <option key={i} value={player}>{player}</option>
                                    })}
                                </select>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9}>
                            MSP:
                        </Grid>
                        <Grid item xs={3}>
                        <div className='centered' style={{height:'100%'}}>
                                <select id={`${openResult}-msp`}>
                                    <option value={'N/A'}>-</option>
                                    {oppRoster().map((player,i) => {
                                        return <option key={i} value={player}>{player}</option>
                                    })}
                                </select>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container paddingTop={2}>
                        <Grid item xs={4}>
                            Comments:
                        </Grid>
                        <Grid item xs={8}>
                        <div className='centered' style={{height:'100%'}}>
                                <textarea id={`${openResult}-comments`}></textarea>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container paddingTop={2}>
                        <Grid item xs={12}>
                            <div className='centered' style={{height:'100%'}}>
                                <Button onClick={submitSpiritScore} variant='contained'>submit</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Stack>                
              </Box>
            </Modal>
    </div>

    

    // return (
    //     <div className='team-results'>
    //         <div className='table-title'>Results</div>
    //         <div className='team-result-table-container'>
    //             <table className='team-result-table table'>
    //                 <thead>
    //                     <tr className='table-head-row'>
    //                         <th>Round</th>
    //                         <th>Opponent</th>
    //                         <th>Score</th>
    //                         <th>Slot</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {result_rows}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // )
}

function PendingMatch({match, id}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'beige',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontFamily: 'Poppins',
    };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if(!match) return <></>


    function submitScore(){
        let s1 = document.getElementById('submit-score-team_1')?.value;
        let s2 = document.getElementById('submit-score-team_2')?.value;
        console.log(s1,s2)

        axios.post(
            `${server_url.DOMAIN}:${server_url.PORT}/result/${match._id}`,
            {
                score_1: s1,
                score_2: s2,

                temp_team_1: match.team_1._id,
                temp_team_2: match.team_2._id,
            }
        )
            .then(res => {
                console.log('success!');
                window.location.reload();
            })
            .catch(handleError)
    }
    
    const opp = match.team_1._id === id ? match.team_2 : match.team_1;


    var submit_status = 'pending';
    if(match.result.status === 'inconsistent') submit_status = 'inconsistent';
    else if(match.team_1._id === id && match.submitted_score_1.status === 'submitted') submit_status = 'waiting'
    else if(match.team_2._id === id && match.submitted_score_2.status === 'submitted') submit_status = 'waiting'

    return <div style={{marginTop:'0px'}}>
        <div style={{textAlign:'center',color:'white',padding:'20px'}}>Pending</div>
        <Paper sx={{backgroundColor:'white', borderRadius:'0',padding:'10px'}}>
            {/* <hr></hr> */}
            <Grid container padding={1} sx={{}}>
                <Grid item xs={2}>
                    <Paper elevation={10} sx={{backgroundColor:'lightblue', height:'100%',width:'100%'}}>
                        <div  className='centered'
                        style={{height:'100%', color:'rgb(80,80,80)', fontSize:11}}
                        onClick={handleOpen}
                        >
                            submit score
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Stack>
                        <div className='centered' style={{height:'100%', padding:'3px', fontSize:13}}>
                            vs. {opp.team_name}
                        </div>
                        <div className='centered' style={{height:'100%', padding:'3px', fontSize:11, fontWeight:700}}>
                            Match # {match.match_number}
                        </div>
                        {
                            submit_status === 'inconsistent' &&
                            <div className='centered' style={{height:'100%', padding:'3px', fontSize:13}}>
                                <Alert severity='warning'>Inconsistent scores!</Alert>
                            </div>
                        }
                        {
                            submit_status === 'waiting' &&
                            <div className='centered' style={{height:'100%', padding:'3px', fontSize:13}}>
                                <Alert severity='success'>Waiting for other team!</Alert>
                            </div>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={2} sx={{}}>
                    <Box component={'img'} sx={{width: '100%',aspectRatio:'1', borderRadius:'50%'}} src={getTeamLogo(opp?.logo)}></Box>
                </Grid>
            </Grid>
        </Paper>


        <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"

            >
              <Box sx={style}>
                <Typography sx={{fontWeight:700, fontSize:15, fontFamily:'Poppins'}} id="modal-modal-title" variant="h6" component="h2">
                  Submit Score [Match #{match.match_number}]
                </Typography>
                <Stack padding={3} spacing={1}>
                    <Grid container>
                        <Grid item xs={9}>
                            <TeamDisplay team_name={match.team_1.team_name} logo={match.team_1.logo} logo_size={20} team_name_size={12}></TeamDisplay>
                        </Grid>
                        <Grid item xs={3}>
                            <div className='centered' style={{height:'100%'}}>
                                <input id={`submit-score-team_1`} type={'number'} min={0} max={13} defaultValue={0}></input>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9}>
                            <TeamDisplay team_name={match.team_2.team_name} logo={match.team_2.logo} logo_size={20} team_name_size={12}></TeamDisplay>
                        </Grid>
                        <Grid item xs={3}>
                            <div className='centered' style={{height:'100%'}}>
                                <input id={`submit-score-team_2`} type={'number'} min={0} max={13} defaultValue={0}></input>
                            </div>
                        </Grid>
                    </Grid>
                </Stack>
                <Grid container>
                    <Grid item xs={12}>
                        <div className='centered' style={{ fontSize:11}}>
                            {match?.stage?.stage_name}&nbsp; &nbsp;|&nbsp; &nbsp;Day {match?.day}&nbsp; &nbsp;|&nbsp; &nbsp;{match?.start_time} hrs&nbsp; &nbsp;|&nbsp; &nbsp;Field-{match?.field}
                        </div>
                    </Grid>
                </Grid>
                <div className='centered' style={{paddingTop:'20px'}}>
                    <Button onClick={submitScore} variant='contained'>submit</Button>
                </div>
                    {match.result.status != 'completed' && <div style={{fontSize:'8px',display:'flex',justifyContent:'center'}}><label>*{match.result.status}</label></div>}
              </Box>
            </Modal>
    </div>
}



export default function TeamDetails(){
    const {id} = useParams()

    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const pwd = searchParams.get("pwd");
    const [teamInfo, setTeamInfo] = useState({})
    const [teamResults, setTeamResults] = useState({})

    


    useEffect(() => {
        console.log('using effect')
        axios.get(
            `${server_url.DOMAIN}:${server_url.PORT}/team_results/${id}`
        )
        .then(res => {
            console.log('results')
            console.log(res.data)
            // console.log(res.data.upcoming)
            setTeamResults({...res.data})
        })
    }, [id])

    useEffect(() => {
        console.log('using effect')
        axios.get(
            `${server_url.DOMAIN}:${server_url.PORT}/team_info/${id}`
        )
        .then(res => {
            console.log('info')
            console.log(res.data)
            // console.log(res.data.upcoming)
            setTeamInfo({...res.data})
        })
    }, [id])
    

    return (
    <>
        <TeamOverview teamData={{...teamInfo, ...teamResults}}></TeamOverview>
        {/* <hr style={{width:'90%', marginLeft:'5%',}}></hr> */}
        <TeamUpcoming id={id} teamInfo={teamInfo}></TeamUpcoming>
        <TeamResults id={id} own_team={teamInfo?.own_team} results={teamResults?.results || []}></TeamResults>
        {/* {pendingScores} */}
        {teamInfo?.own_team && <PendingMatch match={teamInfo?.upcoming} id={id}></PendingMatch>}
        {/* {1 && <PendingMatch match={teamInfo?.upcoming} id={id}></PendingMatch>} */}
    </>
    )
}