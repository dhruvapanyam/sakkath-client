import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { server_url } from './globals'



export default function ScheduleChanges(){
    const num_days = 3;
    const num_fields = 6;
    const [time_slots, setTimeSlots] = useState([
        // ['0630','0740','0850','1000','1110','1220','1330','1440','1550','1700',],
        // ['0630','0740','0850','1000','1110','1220','1330','1440','1550','1700',],
        // ['0630','0740','0850','1000','1110','1220','1330','1440','1550','1700',],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ])

    const [matchDict, setMatchDict] = useState({})


    useEffect(() => {

        axios.get(`${server_url.URL}/fixtures`)
            .then(res => {
                // console.log(res.data)
                let dict = {};
                res.data.forEach((match) => {
                    let inp = document.getElementById(`input-slot-number-${match.slot_number}`);
                    inp.value = match.match_number;

                    dict[match.match_number] = {slot: match.slot_number, changed: false, id: match._id};
                })

                // console.log(dict)
                setMatchDict({...dict});
            })
        
        axios.get(`${server_url.URL}/timeslots`)
            .then(res => {
                // console.log(res)
                setTimeSlots(res.data);
            })

    }, [])


    function getScheduleChanges(){
        let changed = [];
        for(let dom of Array.from(document.getElementsByClassName('input-slot-number'))){
            let mnum = dom.value;
            if(!mnum) continue;
            if(mnum in matchDict === false) continue;
            let snum = parseInt(dom.id.split('-')[3]);
            if(snum !== matchDict[mnum].slot){
                matchDict[mnum].slot = snum
                matchDict[mnum].changed = true;
                changed.push(mnum);
            }
        }
        // console.log(matchDict)
        console.log(changed)
        return changed
    }

    function changeSchedule(){
        let changed = getScheduleChanges();
        changed.forEach(x => {
            console.log(matchDict[x]);
        })

        let slot_data = changed.map((mnum,i) => {
            let slot_number = matchDict[mnum].slot;


            return {
                id: matchDict[mnum].id,
                slot_number,
                match_number: parseInt(mnum)
            }
        })

        // console.log(slot_data)
        if(slot_data.length){
            axios.post(`${server_url.URL}/schedule_change`, slot_data)
                .then(res => {
                    alert('Changed schedule!');
                })
                .catch(err => {
                    alert('Invalid privileges!')
                })
        }


        // timeslot data
        let timeslot_doms = Array.from(document.getElementsByClassName('input-timeslot'));

        let changed_times = {}
        timeslot_doms.forEach(dom => {
            let id = dom.id;
            let day = parseInt(id.split('-')[2]);
            let day_slot = parseInt(id.split('-')[3]);
            if(time_slots[day][day_slot] !== dom.value) {
                // console.log(day,day_slot)
                changed_times[day*10 + day_slot] = dom.value;
            }
        })

        // console.log(num_changed,'changed');
        if(Object.keys(changed_times).length){
            axios.post(`${server_url.URL}/timeslots_change`, changed_times)
                .then(res => {
                    alert('Changed timeslots!');
                })
                .catch(err => {
                    alert('Invalid privileges!')
                })
        }

    }

    let body = [...Array(num_days).keys()].map(day => {
        let day_rows = time_slots[day].map((slot,i) => {
            // console.log(slot)
            return <div key={i}>
                <div style={{display:'inline-block', float:'left'}}>
                    <div style={{width: '60px', float:'left'}}>
                        <input className='input-timeslot' style={{width:'40px',paddingRight:'10px', backgroundColor:'grey'}} id={`input-timeslot-${day}-${i}`} defaultValue={slot}></input>
                        </div>
                    {[...Array(num_fields).keys()].map(j => {
                        let slot_num = day*num_fields*time_slots[day].length + i*num_fields + j;
                        return <div key={j} style={{float: 'left'}}>
                            {/* {select_options(slot_num)} */}
                            <input className='input-slot-number' id={`input-slot-number-${slot_num}`} type='number' style={{width:'30px',fontSize:9, fontWeight:300}}></input>
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

    return <div style={{color:'white', marginTop:70}}>
        {body}
        <br></br>
        <button onClick={changeSchedule}>Change</button>
    </div>
}