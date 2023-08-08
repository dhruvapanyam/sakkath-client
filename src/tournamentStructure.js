import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { server_url } from './globals'


export function resetTournament(data){
    console.log('resetting')
     return axios.put(`${server_url.DOMAIN}:${server_url.PORT}/tournament`, data)
}


export default function TournamentSetup(){
    

    const [params, setParams] = useState({
        "Open": {
            num_pools: 2,
            pools: ['',''],
            format: "Swiss",
            num_rounds: 5,
            semi_finals: false
        },
        "Women's": {
            num_pools: 1,
            pools: ['',''],
            format: "Swiss",
            num_rounds: 5,
            semi_finals: false
        },
    })
    
    const num_days = 3;
    const num_fields = 6;
    const time_slots = ['0630-0740','0740-0850','0850-1000','1000-1110','1110-1220','1220-1330','1330-1440','1440-1550','1550-1700','1700-1810',]

    var slot_data = [...Array(num_days * num_fields * time_slots.length).keys()].map(x => null)

    // format params: num_pools, pool_split_up, num_swiss_rds, semis?
    function changeNumOpenPools(n){
        let val = parseInt(n) || 1;
        let new_state = {...params};
        new_state["Open"].num_pools = val;
        setParams(new_state);
    }
    function changeOpenPools(e,i){
        // console.log(e)
        let pool_teams = (e?.target?.value || '');
        let new_state = {...params};
        new_state["Open"].pools[i] = pool_teams;
        setParams(new_state);
    }
    function changeNumOpenRounds(n){
        let val = parseInt(n) || 1;
        let new_state = {...params};
        new_state["Open"].num_rounds = val;
        setParams(new_state);
    }
    function changeOpenSemis(e){
        let val = Boolean(e?.target?.checked) || false;
        let new_state = {...params};
        new_state["Open"].semi_finals = val;
        setParams(new_state);
    }
    function changeNumWomensPools(n){
        let val = parseInt(n) || 1;
        let new_state = {...params};
        new_state["Women's"].num_pools = val;
        setParams(new_state);
    }
    function changeWomensPools(e,i){
        // console.log(e)
        let pool_teams = (e?.target?.value || '');
        let new_state = {...params};
        new_state["Women's"].pools[i] = pool_teams;
        setParams(new_state);
    }
    function changeNumWomensRounds(n){
        let val = parseInt(n) || 1;
        let new_state = {...params};
        new_state["Women's"].num_rounds = val;
        setParams(new_state);
    }
    function changeWomensSemis(e){
        let val = Boolean(e?.target?.checked) || false;
        let new_state = {...params};
        new_state["Women's"].semi_finals = val;
        setParams(new_state);
    }
    // console.log(params['Women\'s'].pools)

    let open_params = <div>
                        <label>num_open_pools</label>
                        <input id='num-open-pools' type='number' onChange={e => changeNumOpenPools(e?.target?.value)} defaultValue={2} min={1} max={2}></input>
                        <label>num_open_rounds</label>
                        <input id='num-open-rounds' type='number' onChange={e => changeNumOpenRounds(e?.target?.value)} defaultValue={5} min={1} max={6}></input>
                        <label>semi_finals?</label>
                        <input id='open-semis' type='checkbox' onChange={e => changeOpenSemis(e)}></input>
                    </div>
    
    
    let open_pools_dom = [...Array(params["Open"].num_pools).keys()].map(i => {
        return <div key={i}>
            Teams in Pool {i+1}:
            <input style={{width: '100%'}} onChange={e => changeOpenPools(e,i)}></input>
        </div>
    })

    let womens_params = <div>
                        <label>num_womens_pools</label>
                        <input id='num-womens-pools' type='number' onChange={e => changeNumWomensPools(e?.target?.value)} defaultValue={1} min={1} max={2}></input>
                        <label>num_womens_rounds</label>
                        <input id='num-womens-rounds' type='number' onChange={e => changeNumWomensRounds(e?.target?.value)} defaultValue={5} min={1} max={6}></input>
                        <label>semi_finals?</label>
                        <input id='womens-semis' type='checkbox' onChange={e => changeWomensSemis(e)}></input>
                    </div>
    
    
    let womens_pools_dom = [...Array(params["Women's"].num_pools).keys()].map(i => {
        return <div key={i}>
            Teams in Pool {i+1}:
            <input style={{width: '100%'}} onChange={e => changeWomensPools(e,i)}></input>
        </div>
    })


    let pool_names = ['A','B']

    const round_colors = {
        'Open:A-R1': 'rgb(200,200,50)',
        'Open:B-R1': 'rgb(200,150,100)',
        'Open:A-R2': 'rgb(200,200,50)',
        'Open:B-R2': 'rgb(200,150,100)',
        'Open:A-R3': 'rgb(200,200,50)',
        'Open:B-R3': 'rgb(200,150,100)',
        'Open:A-R4': 'rgb(200,200,50)',
        'Open:B-R4': 'rgb(200,150,100)',
        'Open:A-R5': 'rgb(200,200,50)',
        'Open:B-R5': 'rgb(200,150,100)',
        'Open:A-R6': 'rgb(200,200,50)',
        'Open:B-R6': 'rgb(200,150,100)',
        'Open:SF': 'rgb(200,50,50)',
        'Open:F': 'rgb(100,50,50)',

        "Women's:A-R1": 'rgb(100,200,100)',
        "Women's:B-R1": 'rgb(50,200,100)',
        "Women's:A-R2": 'rgb(100,200,100)',
        "Women's:B-R2": 'rgb(50,200,100)',
        "Women's:A-R3": 'rgb(100,200,100)',
        "Women's:B-R3": 'rgb(50,200,100)',
        "Women's:A-R4": 'rgb(100,200,100)',
        "Women's:B-R4": 'rgb(50,200,100)',
        "Women's:A-R5": 'rgb(100,200,100)',
        "Women's:B-R5": 'rgb(50,200,100)',
        "Women's:SF": 'rgb(50,150,100)',
        "Women's:F": 'rgb(50,100,100)',
    }

    // empty, O-A1, O-B1, O-A2, ..., O-SF?, O-F
    let select_options = (slot_num) => <select id={`time-slot-${slot_num}`} defaultValue="o0" className='time-slot-input' onChange={e => {if(e.target.value in round_colors) e.target.style.backgroundColor = round_colors[e.target.value]}}>
                            <option value={'n/a'}>-</option>   
                            {[...Array(params["Open"].num_pools).keys()].map(i => {
                                return [...Array(params["Open"].num_rounds).keys()].map(j => {
                                    return <option key={j} value={`Open:${pool_names[i]}-R${j+1}`}>O{pool_names[i]}{j+1}</option>
                                })
                            })}  
                            {params.Open.semi_finals && <option value='Open:SF'>O-SF</option>} 
                            <option value='Open:F'>O-F</option>
                            {[...Array(params["Women's"].num_pools).keys()].map(i => {
                                return [...Array(params["Women's"].num_rounds).keys()].map(j => {
                                    return <option key={j} value={`Women's:${pool_names[i]}-R${j+1}`}>W{pool_names[i]}{j+1}</option>
                                })
                            })}  
                            {params['Women\'s'].semi_finals && <option value={`Women's:SF`}>W-SF</option>} 
                            <option value="Women's:F">W-F</option>
                        </select>

    let body = [...Array(num_days).keys()].map(day => {
        let day_rows = time_slots.map((slot,i) => {
            return <div key={i}>
                <div style={{display:'inline-block', float:'left'}}>
                    <div style={{width: '60px', float:'left'}}>slot-{i+1}</div>
                    {[...Array(num_fields).keys()].map(j => {
                        let slot_num = day*num_fields*time_slots.length + i*num_fields + j;
                        return <div key={j} style={{float: 'left'}}>
                            {select_options(slot_num)}
                        </div>
                    })}
                </div>
                <br></br>
            </div>
        });

        return <div key={day}>
            Day {day+1}<br></br>
            {day_rows}
            <br></br>
            </div>;
    })

    const navigate = useNavigate();

    function checkScheduleCompatibility(){
        // check if schedule compatible

        // 1. if anything is odd-numbered, I am sorry
        for(let i=0; i<params.Open.num_pools; i++){

            if(params.Open.pools[i].split(',').length % 2) 
            {
                alert('odd numbers are bad');
                return false;
            }
        }
        for(let i=0; i<params['Women\'s'].num_pools; i++){
            if(params['Women\'s'].pools[i].split(',').length % 2) 
            {
                alert('odd numbers are bad');
                return false;
            }
        }

        // 2. check if pools are equally sized
        for(let div in params){
            if(params[div].num_pools == 2){
                if(params[div].pools[0].split(',').length != params[div].pools[1].split(',').length){
                    alert('Pools are uneven')
                    return false;
                }
            }
        }

        // 3. check schedule slots based on num_teams
        for(let div in params){
            let div_name = String(div);
            let total_num_teams = 0;
            for(let i=0; i<params[div].num_pools; i++){
                let pool = pool_names[i];
                let num_teams = params[div].pools[i].split(',').length;
                total_num_teams += num_teams;

                for(let j=0; j<params[div].num_rounds; j++){
                    let slots = Array.from(document.getElementsByClassName('time-slot-input')).filter(dom => dom.value == `${div_name}:${pool}-R${j+1}`)
                    // console.log(`${div_name}${pool}${j+1}`, slots)
                    if(slots.length != Math.ceil(num_teams/2)){
                        alert(`${div_name}${pool}${j+1} requires ${Math.ceil(num_teams/2)}, but found ${slots.length}`);
                        return false
                    }
                }
                
            }
            if(params[div].semi_finals){
                let slots = Array.from(document.getElementsByClassName('time-slot-input')).filter(dom => dom.value == `${div_name}:SF`)
                // console.log(`${div_name}${pool}${j+1}`, slots.length)
                if(slots.length != Math.ceil(total_num_teams/2)){
                    alert(`${div_name}-SF requires ${Math.ceil(total_num_teams/2)}, but found ${slots.length}`);
                    return false
                }
            }
            let slots = Array.from(document.getElementsByClassName('time-slot-input')).filter(dom => dom.value == `${div_name}:F`)
            // console.log(`${div_name}${pool}${j+1}`, slots.length)
            if(slots.length != Math.ceil(total_num_teams/2)){
                alert(`${div_name}-F requires ${Math.ceil(total_num_teams/2)}, but found ${slots.length}`);
                return false
            }
        }

        let filled_slots = Array.from(document.getElementsByClassName('time-slot-input')).filter(dom => dom.value != `n/a`)
        
        let slot_data = filled_slots.map((slot_dom,i) => {
            let slot_number = parseInt(slot_dom.id.split('-')[2]);
            let division = slot_dom.value.split(':')[0];
            let stage_name = slot_dom.value.split(':')[1]


            return {
                division,
                stage_name,
                slot_number,
                match_number: i+1,
            }
        })

        console.log(slot_data)

        axios.post(`${server_url.DOMAIN}:${server_url.PORT}/schedule_load`, slot_data)
            .then(res => {
                console.log(res);
                axios.post(`${server_url.DOMAIN}:${server_url.PORT}/schedule_start`)
                    .then(res => {
                        alert('Tournament has been set up!');
                        // PLEASE UNCOMMENT!
                        // navigate('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err?.response?.data)
            })

    }

    async function validateParams(){
        // first check teams, etc
        let data = {
            formats:{
                "Open": {num_pools: params.Open.num_pools, num_rounds: params.Open.num_rounds, format: params.Open.format, semi_final: params.Open.semi_finals},
                "Women's": {num_pools: params["Women's"].num_pools, num_rounds: params["Women's"].num_rounds, format: params["Women's"].format, semi_final: params["Women's"].semi_finals},
            },
            pools: {
                "Open": params.Open.pools.slice(0,params.Open.num_pools).map(s => {return s.split(',')}),
                "Women's": params['Women\'s'].pools.slice(0,params['Women\'s'].num_pools).map(s => {return s.split(',')}),
            }
        }
        console.log(data)
        // resetTournament()

        resetTournament(data)
            .then(res => {
                console.log('successful reset');
                checkScheduleCompatibility();
            })
            .catch(err => {
                alert(err?.response?.data?.message);
            })

        
        
    }

    return <div style={{color:'white'}}>
    <div style={{marginTop: '9vh'}}></div>
    {open_params}
    <br></br>
    {open_pools_dom}
    <br></br>
    {womens_params}
    <br></br>
    {womens_pools_dom}
    <br></br>
    {body}
    <br></br>
    <button onClick={()=>{
        validateParams();
    }}>check params</button>
    </div>
}