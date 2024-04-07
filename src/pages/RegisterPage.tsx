import { Box, Button, ButtonProps, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import React from 'react'
import { useState } from 'react';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { purple } from '@mui/material/colors'
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [username,setUsername] = useState <string>("")
  const [error, setError] = useState<string>("")
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
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

  return (
    <div className='registerContainer'>
      <div className='formContainer'>
     
        <form className='formDetails ' onSubmit={ handleSubmit} >
        <div className="createAccoutTitle createAccoutTitleMobile " >Create account</div>
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
        <Button type="submit" color="secondary" style={{margin:"10px 0px"}}>Register</Button>
        
    
        </form>
        <div style={{marginBottom:"15px", color:"#000",display:"flex", flexDirection:"column"}}> 
        <div>{error}</div>
        <Box sx={{ '& button': { m: 1 } }}>
        <ColorButton variant="contained" onClick={() => navigate("/login")} size="small">
          Login
        </ColorButton>
        </Box>
        
         </div>
        
      </div>
      
    </div>
  )
}

export default RegisterPage
