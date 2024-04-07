import React, { useState } from 'react'
import "../App.css"
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [username,setUsername] = useState <string>("")
  const [error,setError] = useState<string>("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const [_,setCookies] = useCookies(["access_token"])
  
  const handleSubmit = (event:any) =>{
   event.preventDefault()
    axios.post("http://localhost:3001/login", {
      email:email, password:password, username:username
    }).then((response) =>{
      if(response.status === 200) {
        setCookies("access_token",response.data.token)
        window.localStorage.setItem("userID", response.data.userID)
        navigate("/form")
      }
    },(error) => {
      if (error.response) {
       
        if (error.response.status === 401) {
          
          setError(error.response.data.message);
        } else {

          setError("Server error, please try again later.");
        }}})
  
  }
  
  return (
    <div className='registerContainer'>
    <div className='formContainer'>
    
      <form className='formDetails ' onSubmit={ handleSubmit} >
      <div className="createAccoutTitle createAccoutTitleMobile " >Sign in</div>
      <Box className="PasswordEmailContainer ">
      <FormControl sx={{ m: 1, width: '20ch' }} variant="standard">
        <InputLabel >Username</InputLabel>
        <Input
          value={username}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setUsername(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
             <AccountCircle/>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '20ch' }} variant="standard">
        <InputLabel >Email</InputLabel>
        <Input
          value={email}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
             <AccountCircle/>
            </InputAdornment>
          }
        />
      </FormControl>
        <FormControl sx={{ m: 1, width: '20ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      </Box>
      <Button type="submit" color="secondary" style={{margin:"50px 0px"}}>Login</Button>

      </form>
      <div style={{marginBottom:"25px", color:"#000",display:"flex", flexDirection:"column"}}>{error}</div>
    </div>
    
   
        
  
    
  </div>
  )
}

export default LoginPage
