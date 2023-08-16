import axios from "axios";

function setToken(token){
    // console.log(token);
    if(!token) return;
    localStorage.setItem('jwt_token',token);
    axios.defaults.headers.common['x-auth-token'] = token;
}

export function loadTokenHeader(){
    let token = localStorage.getItem('jwt_token')
    if(token)
        axios.defaults.headers.common['x-auth-token'] = token;
}

function deleteToken(){
    localStorage.removeItem('jwt_token');
    delete axios.defaults.headers.common['x-auth-token'];
}

function setTeamInfo(data){
    if(!data.team_id){
        deleteTeamInfo()
        localStorage.setItem('my_role','admin');
        return
    }
    localStorage.setItem('my_team_id',data.team_id);
    localStorage.setItem('my_team_name',data.team_name);
    localStorage.setItem('my_team_logo',data.logo);
    localStorage.setItem('my_role','captain');
}

function deleteTeamInfo(){
    localStorage.removeItem('my_team_id');
    localStorage.removeItem('my_team_name');
    localStorage.removeItem('my_team_logo');
    localStorage.removeItem('my_role');
}

export function handleSignIn(data){
    setToken(data.token);
    setTeamInfo(data)
}
export function handleSignOut(){
    deleteToken();
    deleteTeamInfo()
}

export function handleError(err){
    let err_data = err?.response?.data;
    if(!err_data?.token_err) return; // not a token error
    if(err_data?.expired){
        // expired token
        alert('Your token has expired, please login to use functionalities')
        deleteToken();
        return;
    }
    alert('Your token is invalid for this functionality')
    deleteToken(); // idk what else to do

    
}