import { Box, Button, ButtonProps, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography, useMediaQuery } from '@mui/material'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import React from 'react'
import { useState } from 'react';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { purple } from '@mui/material/colors'
import { createTheme, styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { store } from '../store/store';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
export const theme = createTheme({
  palette: {
    
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    
  },
});
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [username,setUsername] = useState <string>("")
  const [error, setError] = useState<string>("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );
  
  const handleSubmit = (event:any) =>{
   event.preventDefault()
    axios.post("http://localhost:3001/authentication", {
      email:email, password:password, username:username
    }).then((response) =>{
      if(response.status === 201){
        navigate("/login")
      }
     
    },(error) => {
      if (error.response) {
       
        if (error.response.status === 400) {
          
          setError(error.response.data.message);
        } else {

          setError("Server error, please try again later.");
        }}})
    
  
  }
  const matches = useMediaQuery('(max-width:400px)')

  return (
    <div className={theme? 'registerContainer':'registerContainer2'}>
      <div className='formContainer'>
        <div className='triangleFormTitle'>
        <div className="createAccoutTitle createAccoutTitleMobile " >Create account</div>
        <div className='triangle'></div>
        </div>
        <form className='formDetails ' onSubmit={ handleSubmit} >
        
        <Box className="PasswordEmailContainer " >
        <FormControl sx={{
          borderColor: '#e3f2fd',
          boxShadow: 7,
          borderRadius: 2,
          p: 0.5,
          minWidth:matches? 100: 250,
          maxHeight: matches? 25:50,
          margin:1
         
       
        }} >
          <InputLabel  style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem"}} >Username</InputLabel>
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
         
       
        }} >
          <InputLabel    style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem"}}>Email</InputLabel>
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
         
       
        }} >
          <InputLabel htmlFor="standard-adornment-password"  style={{color:"#000", fontSize:matches?"0.5rem":"0.7rem"}}>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            style={{fontSize:"0.8rem", marginTop:matches?"0px":"10px"}}
            value={password}
            onChange={(event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  
                >
                  {showPassword ? <VisibilityOff style={{height: matches?"1rem":"1.2rem"}} /> : <Visibility style={{height: matches?"1rem":"1.2rem"}}/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </Box>
        <Button type="submit" color="secondary" style={{margin:matches?"15px 0px": "0px 0px",padding: matches?"5px 5px":"10px 50px",fontSize:matches?"0.5rem":"0.8rem"}}>Register</Button>
        
    
        </form>
        <div style={{marginBottom:"15px", color:"#000",display:"flex", flexDirection:"column"}}> 
        <div className='error'>{error}</div>
        <Box sx={{ '& button': { m: 1 } }}>
        <ColorButton variant="contained" onClick={() => navigate("/login")} size="small"  style={{margin:matches?"25px 0px":"15px 0px",padding: matches?"5px 5px":"10px 50px",fontSize:matches?"0.5rem":"0.8rem"}}>
          Login
        </ColorButton>
        </Box>
        
         </div>
        
      </div>
      
    </div>
  )
}

export default RegisterPage
function json2mq(arg0: { minWidth: number; }): string | ((theme: unknown) => string) {
  throw new Error('Function not implemented.');
}

