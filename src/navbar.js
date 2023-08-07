import sakkath_logo from './static/sakkath_logo.png'
import sample_logo from './static/blank.webp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { login, logout } from './landingPage'
// import { server_url } from './globals'
// import { getImage } from './teamDetails'

// export function resetTournament(data){
//     console.log('resetting')
//      return axios.put(`${server_url.DOMAIN}:${server_url.PORT}/tournament`, data)
// }

// export default function NavBar(){
//     const navigate = useNavigate()
//     // let token = localStorage.getItem('jwt_token');
//     // let my_team_id = localStorage.getItem('my_team_id');
//     // let my_team_name = localStorage.getItem('my_team_name');
//     // let my_team_logo = localStorage.getItem('my_team_logo');
//     // console.log(my_team_logo);
//     return (
//         <div id="navbar">
//             <img onClick={()=>{navigate('/')}} src={sakkath_logo} alt="Sakkath Logo" height="80%"></img>
//             {my_team_logo && <img onClick={()=>{navigate(`/team/${my_team_id}`)}} src={getImage(my_team_logo)} alt="Sakkath Logo" height="80%" style={{float:'right', borderRadius: '50%', border: '1px solid grey'}}></img>}
//             {/* {!token && <button style={{float:'right',height:'100%'}} onClick={login}>Login</button>} */}
//             {!token && <a style={{float:'right',paddingRight:'10px', paddingTop: '10px', color: 'darkgrey'}} onClick={login}>Login</a>}
//             {token && <a style={{float:'right',paddingRight:'10px', paddingTop: '10px', color: 'darkgrey'}} onClick={logout}>Logout</a>}
//         </div>
//     )
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { getImage } from './globals';
import { login, logout } from './App';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  var token = localStorage.getItem('jwt_token');
  var my_team_logo = localStorage.getItem('my_team_logo');
  var my_team_id = localStorage.getItem('my_team_id');

  // console.log('token',token,my_team_logo)

  return (
    <Box id="navbar" sx={{ flexGrow: 1, borderBottom: '1px solid grey', position: 'fixed', top:0, width: '100%'}}>
      <AppBar position="static" style={{backgroundColor: 'black'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box onClick={() => {navigate('/')}}
        component="img"
        sx={{
            marginTop:  1,
          height: 40,
        //   width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="sakkath"
        src={sakkath_logo}
      />
          </Typography>
            <div>
              {token &&
                <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={token ? getImage(my_team_logo) : sample_logo} />
                  </IconButton>
                </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {my_team_id && <MenuItem sx={{fontFamily:'Poppins', fontSize:13}} onClick={()=>{navigate(`/team/${my_team_id}`);handleClose()}}>Team Page</MenuItem>}
                <MenuItem sx={{fontFamily:'Poppins', fontSize:13}} onClick={logout} >Logout</MenuItem>

              </Menu>
              </div>
            }
            
            {!token && <div style={{fontFamily:'Poppins', fontSize:13, color: 'grey', height:'100%'}} onClick={()=>{navigate('/login')}} >Login</div>}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}