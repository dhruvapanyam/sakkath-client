export const server_url = {
    // URL: `http://192.168.0.189`,
    // URL: `http://192.168.0.113`
    URL: `https://35.154.194.151`,
    // URL: 'https://sakkath.souravtecken.com'
}

export function getImage(img){
    const images = require.context('./static/', true);
    var imageUrl;
    try{
        imageUrl = images(`./${img}`)
    }
    catch(e){
        imageUrl = undefined
    }
    return imageUrl
}

export function getTeamLogo(img){
    const images = require.context('./static/team_logos/', true);
    var imageUrl;
    try{
        imageUrl = images(`./${img}`)
    }
    catch(e){
        imageUrl = undefined
    }
    return imageUrl
}



const gradient_left = 40
const gradient_right = 70

export const colors_gradient = (div, c, dir='to right') => {
    if(div in colors === false) return;
    if(c in colors[div] === false) return;

    return `linear-gradient(${dir}, ${colors[div][c].left} ${gradient_left}%, ${colors[div][c].right} ${gradient_right}%)`
}

export const colors = {
    "Open": {
        // 'A': {left: '#babfbd', right: '#5773a1'},
        'A': {left: '#d4d6d5', right: '#5773a1'},
        'B': {left: '#82b0a7', right: '#5773a1'},
        'S': {left: '#44a2a6', right: '#5773a1'},
        'F': {left: '#246c6e', right: '#5773a1'},
    },
    "Women's": {
        'A': {left: '#babae3', right: '#e8b589'},
        'S': {left: '#7a63a8', right: '#e8b589'},
        'F': {left: '#7a63a8', right: '#e8b589'},
    }
}

export const get_left_color = (div, c) => {
    if(div in colors === false) return;
    if(c in colors[div] === false) return;

    return colors[div][c].left;
}


export const colonizeTime = (time_s) => {
    if(!time_s) return time_s;
    return time_s.slice(0,2) + ':' + time_s.slice(2,4);
}



export const spirit_questions = [
    {
        question: 'How was the team\'s knowledge and usage of rules?',
        options: [
            'They knew all the rules and used them correctly',
            'There were 1 or 2 instances where they did not know the rules, or used them incorrectly',
            'There were many instances where they did not know the rules, or used them incorrectly'
        ],
        weightage: 1,
    },
    {
        question: 'What was the level of body contact by the team in this game?',
        options: [
            'Absolutely no body contact',
            'Some contact but not significant',
            '1 or 2 instances of body contact that affected play and should have been avoided',
            'Many instances of body contact that affected play and should have been avoided'
        ],
        weightage: 1,
    },
    {
        question: 'Were there any instances of display of negative attitude by the team towards the opponent or their own teammates?',
        options: [
            'No, not at all, there were extremely positive throughout the game',
            'Yes, on 1 or 2 occassions, their actions or words displayed a negative attitude',
            'Yes, on many instances, their actions or words displayed a negative attitude'
        ],
        weightage: 1,
    },
    {
        question: 'Did the team communicate clearly and respectfully with you?',
        options: [
            'Yes, on all occasions',
            'Yes, apart from one or two occasions',
            'No, they were not respectful on many occasions'
        ],
        weightage: 1,
    },
    {
        question: 'How often did the team use hand signals to communicate calls, resolutions, and scores?',
        options: [
            'Very often',
            'Some of the times',
            'Very rarely'
        ],
        weightage: 1,
    },
    {
        question: 'Did the team keep to time limits during calls, between points, at half-time, and during timeouts?',
        options: [
            'Yes, all the time',
            'No, there were a few instances where they did not keep to limits, but it did not affect the result of the game',
            'No, they did not keep to time limits in a manner that affected the result of the game'
        ],
        weightage: 1,
    },
    {
        question: 'How was the team with perspective?',
        options: [
            'Great, they gave and asked for perspective when necessary AND there was at least one instance where they gave perspective against their team',
            'Good, they gave and asked for perspective when necessary',
            'Not great, they barely asked for perspective and barely discussed calls',
            'Not good, they barely asked for perspective, barely discussed calls AND interfered in at least one call when not asked for'
        ],
        weightage: 1,
    },
    {
        question: 'Was the team consistent with their calls, or did their calling behaviour change as the game progressed?',
        options: [
            'Yes, there was consistency',
            'No, there was inconsistency'
        ],
        weightage: 1,
    },
    {
        question: 'Were the calls made by the team relevant in affecting the outcome of the game?',
        options: [
            'Yes, at all times',
            'Mostly, but at times, they made insignificant calls which did not have an impact on the game',
            'No, they made many insignificant calls which did not have an impact on the game'
        ],
        weightage: 1,
    },
    {
        question: 'Was the team fair and justifiable in their calls?',
        options: [
            'Yes, at all times, and they retracted calls when they felt they were wrong',
            'Mostly, but on some occassions, they made unjustifiable calls/contests',
            'No, they would only see things in a manner favourable to them and take advantage of the rules'
        ],
        weightage: 1,
    }

    
]
