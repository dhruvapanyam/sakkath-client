import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { server_url } from './globals'
import { ButtonTabs } from './schedule'


function RankingView({team_data}){
    team_data.sort((t1,t2) => t2.spirit - t1.spirit)
    return <div className='centered' style={{marginTop:'10px', fontSize: 13, fontWeight: 400}}>
        <table style={{border: '1px solid grey', borderCollapse:'collapse', textAlign:'center'}}>
            <thead>
                <tr>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Rank</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Team</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Spirit</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Matches</th>
                </tr>
            </thead>
            <tbody>
                {team_data.map((team,i) => {
                    return <tr key={i}>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{i+1}.</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.team_name}</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{Math.round(100*team.spirit)/100}</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.num_matches}</td>
                        </tr>
                })}
            </tbody>
        </table>
    </div>
}

function MVPMSPView({team_data}){
    team_data.sort((t1,t2) => t1.rank - t2.rank)
    for(let i=0; i<team_data.length; i++){
        let players = Object.keys(team_data[i].players).filter(p => p != 'undefined' && p != 'N/A');

        let maxc = 0
        if(players.length) maxc = Math.max(...players.map(p => team_data[i].players[p]))
        let maxplayers = players.filter(p => team_data[i].players[p] == maxc)

        team_data[i].max_count = maxc;
        team_data[i].max_players = maxplayers;
    }
    return <div className='centered' style={{marginTop:'10px', fontSize: 12}}>
        <table style={{border: '1px solid grey', borderCollapse:'collapse', textAlign:'center'}}>
            <thead>
                <tr>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Rank</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Team</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Max #</th>
                    <th style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>Players</th>
                </tr> 
            </thead>
            <tbody>
                {team_data.map((team,i) => {
                    return <tr key={i}>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.rank+1}.</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.team_name}</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.max_count}</td>
                            <td style={{border: '1px solid grey', borderCollapse:'collapse', padding: '5px'}}>{team.max_players.join(', ')}</td>
                        </tr>
                })}
            </tbody>
        </table>
    </div>
}


export default function SpiritData(){

    const [activeDivision, setActiveDivision] = useState('Open')
    const [activeCategory, setActiveCategory] = useState('Ranking')

    const [spiritData, setSpiritData] = useState({'MVP': {"Open":[],"Women's":[]}, 'MSP': {"Open":[],"Women's":[]}, 'Ranking': {"Open":[],"Women's":[]}})

    useEffect(() => {
        axios.get(`${server_url.URL}/mvps`)
            .then(res => {
                let temp = {...spiritData}
                for(let div in res.data){
                    temp['MVP'][div] = res.data[div];
                }

                setSpiritData(temp);
            })
            .catch(e => {
                console.log(e)
            })
        axios.get(`${server_url.URL}/msps`)
            .then(res => {
                let temp = {...spiritData}
                for(let div in res.data){
                    temp['MSP'][div] = res.data[div];
                }

                setSpiritData(temp);
            })
            .catch(e => {
                console.log(e)
            })
        axios.get(`${server_url.URL}/spirit_ranking`)
            .then(res => {
                let temp = {...spiritData}
                for(let div in res.data){
                    temp['Ranking'][div] = res.data[div];
                }

                setSpiritData(temp);
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    // console.log(spiritData)


    return <div style={{marginTop: 70, padding: '10px', color: 'white'}}>
        <ButtonTabs tab_names={['Open',"Women's"]} active_tab={activeDivision} activate_tab={setActiveDivision}></ButtonTabs>
        <ButtonTabs tab_names={['MVP','MSP','Ranking']} active_tab={activeCategory} activate_tab={setActiveCategory}></ButtonTabs>

        {activeCategory === 'Ranking' && <RankingView team_data={spiritData.Ranking[activeDivision]}></RankingView>}
        {activeCategory !== 'Ranking' && <MVPMSPView team_data={spiritData[activeCategory][activeDivision]}/>}
    </div>
}