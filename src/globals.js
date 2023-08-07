export const server_url = {
    // DOMAIN: `http://192.168.0.189`,
    DOMAIN: `http://13.51.170.191`,
    PORT: 4040
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

const gradient_left = 30
const gradient_right = 70

export const colors_gradient = (div, c, dir='to right') => {
    if(div in colors === false) return;
    if(c in colors[div] === false) return;

    return `linear-gradient(${dir}, ${colors[div][c].left} ${gradient_left}%, ${colors[div][c].right} ${gradient_right}%)`
}

export const colors = {
    "Open": {
        'A': {left: '#babfbd', right: '#5773a1'},
        'B': {left: '#99bdb6', right: '#5773a1'},
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