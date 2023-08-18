import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import {DivisionTab} from './teamList'
import { colonizeTime, getTeamLogo, get_left_color, server_url } from './globals';
import { Grid, Typography, ButtonBase, Stack, Divider, Box, IconButton, Tab, Tabs, CircularProgress } from '@mui/material';
import {Paper} from '@mui/material';

import { getImage, colors_gradient } from './globals';
import { ButtonTabs } from './schedule';


export default function RulesFormat(){
    const [activeTab, activateTab] = useState('Rules');

    var fontSize = 14;
    var fontWeight = 300;

    var format_content = <div style={{color:'white', padding: '30px'}}>
        <h4>Open Division</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            <ul>
                <li>32 teams split into two pools A and B</li>
                <li>6 rounds of swiss draw matches</li>
                <li>One final with the corresponding position holder from the other pool (A1vB1, A2vB2, A3vB3…)</li>

            </ul>
        </div>

        <h4>Women's Division</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            <ul>
                <li>12 teams in the same pool, which will be called as pool A</li>
                <li>5 rounds of swiss draw matches</li>
                <li>One final with the nearest position holder to finish at the higher position (1v2, 3v4…)</li>

            </ul>
        </div>

        <h4>Swiss Draw Format</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            Your first match within the group? Random.
            After that, matchups will be based on your results and points. 
            So, if you're acing it, get ready for some tougher challenges. 
            And if things don't go your way, get some friendlier matchups. 
            Every win is a chance to climb up the points table, until it's time for your final match.
        </div>
    </div>


    var rules_content = <div style={{color:'white', padding: '30px'}}>
        <h4>Game Rules</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            <ul>
                <li>All standard WFDF rules apply, unless stated otherwise below</li>
                <li>65-minutes, Game to 15</li>
                <li>Half-time at the 30-minute mark: when you hear the whistle, finish the point and take half</li>
                <li>If any team reaches 8 points before the half-time at 30 minutes, you should call half-time</li>
                <li>Half-time is 2 minutes, counted from the time of the score that initiates the half-time</li>
                <li>After half-time, only change possession. Do not change sides, to save time.</li>
                <li>65-minute hard cap: the point being played is completed, and is the last point of the match, even if that results in a tie</li>
                <li>If the hard cap whistle is blown after a point is complete, but before the next pull, the next point must be played, since the next point is considered to have started as soon as the previous point is scored</li>
                <li>70-minute hard stop: if the disc is in the air when the whistle is blown, that pass is completed and the game stops, and the field is cleared immediately, even if the game is tied</li>
                <li>Only 1 time-out per team per game: duration 60 seconds</li>
                <li>Timeouts cannot be taken once hard cap has been indicated</li>
                <li>Only for the gold, silver, bronze matches in both divisions, a result will be necessary. Any added time may be adjusted for the next match, as per the TDs discretion, and their decision will be final.</li>
            </ul>
        </div>

        <h4>Additional Rules</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            <ul>
                <li>All teams MUST be ready with their first line exactly at the time their match is scheduled to begin</li>
                <li>ALL tosses, huddles, cheers, line-calling must be completed by the teams BEFORE the scheduled match start time</li>
                <li>If the previous match has gone on till hard stop, they will exit the field at the soonest, and the current match will begin. Any minor delays will not add additional time</li>
                <li>If your opponent team is not ready at the exact time your match is scheduled to begin, give a five-minute grace period. Award yourself one point at exactly 5 minutes past the scheduled time. For every five-minute delay beyond that, you are awarded one point each.</li>
                <li>In case of rain curtails, matches will be cancelled in the decreasing order of standings in the points table, the lower-ranked teams will be more likely to forfeit a match</li>

            </ul>
        </div>

        <h4>Tie-breaking in Standings</h4>
        <div style={{fontSize:fontSize, fontWeight: fontWeight}}>
            <ol>
                <li>Head-to-head, if a clear order can be established</li>
                <li>Opposition Points Total, demonstrating the difficulty level a team has faced thus far</li>
                <li>Goal difference counting all games</li>
                <li>Randomiser (digital coin toss)</li>
                <li>In the case of a tie in the final stage (apart from the gold, silver, and bronze matches), a coin toss determines who wins the universe point</li>


            </ol>
        </div>
    </div>


    return <div style={{marginTop: 80}}>
        <ButtonTabs tab_names={['Rules','Format']} active_tab={activeTab} activate_tab={activateTab}></ButtonTabs>

        {activeTab === 'Format' && format_content}
        {activeTab === 'Rules' && rules_content}
    </div>
}