import React, { useState } from 'react'
import "../App.css"
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, useMediaQuery } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import { ColorButton } from './RegisterPage';
import { adminID } from './DaysOffUser';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [username,setUsername] = useState <string>("")
  const [error,setError] = useState<string>("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const [_,setCookies] = useCookies(["access_token"])
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );
  
  const handleSubmit = (event:any) =>{
   event.preventDefault()
    axios.post("http://localhost:3001/login", {
      email:email, password:password, username:username
    }).then((response) =>{
      if(response.status === 200) {
        setCookies("access_token",response.data.token)
        window.localStorage.setItem("userID", response.data.userID)
        if(window.localStorage.getItem('userID') !== adminID)
             {navigate("/form")
            }
            else{
              navigate("/daysoff")
            }
      
        
      }
    },(error) => {
      if (error.response) {
       
        if (error.response.status === 401) {
          
          setError(error.response.data.message);
        } else {

          setError("Server error, please try again later.");
        }}})
  
  }
  const matches = useMediaQuery('(max-width:400px)');
  return (
    <div className={theme? 'registerContainer':'registerContainer2'}>
    <div className='formContainer'>
       
       <div className='triangleFormTitle'>
       <div className="createAccoutTitle createAccoutTitleMobile " >Sign in</div>
        <div className='triangle'></div>
        </div>
      <form className='formDetails ' onSubmit={ handleSubmit} >
      
      <Box className="PasswordEmailContainer ">
      <FormControl sx={{
          borderColor: '#e3f2fd',
          boxShadow: 7,
          borderRadius: 2,
          p: 0.5,
          minWidth:matches? 100: 250,
          maxHeight: matches? 25:50,
          margin:1
         
       
        }}>
        <InputLabel  style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem" }}>Username</InputLabel>
        <Input
          value={username}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setUsername(event.target.value)}
          style={{fontSize:"0.8rem", marginTop:matches?"0px":"10px"}}
        />
      </FormControl>
      <FormControl sx={{
          borderColor: '#e3f2fd',
          boxShadow: 7,
          borderRadius: 2,
          p: 0.5,
          minWidth:matches? 100: 250,
          maxHeight: matches? 25:50,
          margin:1

       
        }}>
        <InputLabel  style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem"}} >Email</InputLabel>
        <Input
          value={email}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(event.target.value)}
          style={{fontSize:"0.8rem", marginTop:matches?"0px":"10px"}}
        />
      </FormControl>
        <FormControl sx={{
          borderColor: '#e3f2fd',
          boxShadow: 7,
          borderRadius: 2,
          p: 0.5,
          minWidth:matches? 100: 250,
          maxHeight: matches? 25:50,
          margin:1
         
       
        }}>
         <InputLabel  style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem"}}>Password</InputLabel>
        <Input
          id="standard-adornment-password"
          style={{fontSize:"0.8rem", marginTop:matches?"0px":"10px"}}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
               
              >
                {showPassword ? <VisibilityOff style={{height: matches?"1rem":"1.2rem"}}/> : <Visibility style={{height:matches?"1rem":"1.2rem"}} />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      </Box>
      <div className='error'>{error}</div>
      <ColorButton type="submit" color="secondary" style={{margin:"50px 0px",padding: matches?"5px 5px":"10px 50px",fontSize:matches?"0.5rem":"0.8rem"}}>Login</ColorButton>

      </form>
      
    </div>
    
   
        
  
    
  </div>
  )
}

export default LoginPage
