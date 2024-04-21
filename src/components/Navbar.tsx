import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../App.css'
import { useCookies } from 'react-cookie'
import { Button, ThemeProvider, alpha, createTheme, getContrastRatio, useMediaQuery, useTheme } from '@mui/material'
import { adminID } from '../pages/DaysOffUser'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import { changeTheme } from '../features/themeSlice'
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import { orange } from '@mui/material/colors';

const Navbar = () => {
  const [cookies, setCookie,removeCookie] = useCookies(["access_token"]);
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(changeTheme(!theme));
  };
 const matches = useMediaQuery('(max-width:400px)');
  const logout = () =>{
   
    removeCookie('access_token')
  }
  const color = orange[500]
  
  return (
  
    <div > 
      {matches && !cookies.access_token ? <div className={theme?"navbar":"navbar2"}>
          <div><DarkModeSwitch
         
            checked={theme}
            onChange={toggleDarkMode}
            size={18}
          /> 
          </div>
        <div><Dropdown >
       
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: !theme ? 'neutral':'primary'} }}
          >
            <MoreVert />
          </MenuButton>
          <Menu style={{background: theme?"#041038":"#4F81B1"}}>
          <MenuItem onClick={ ()=>navigate("/register")}  style={{background:theme?"#4E44B0":"#bbdefb", fontSize:"0.8rem",color:theme?"white":"#000", fontFamily:"sans-serif"}}>Register</MenuItem>
            <MenuItem onClick={ ()=>navigate("/login")} style={{background:theme?"#4E44B0":"#bbdefb", fontSize:"0.8rem",color:theme?"white":"#000",fontFamily:"sans-serif"}}>Login</MenuItem>
            
          </Menu>
          
        </Dropdown>
        </div>
        </div> :  cookies.access_token ? (
        
        <div className={theme?"navbar":"navbar2"}>
          <div className={theme?"navbarButtons":"navbar2Buttons"}>
        <NavLink to={"/"}style={({ isActive }) => {  return isActive ? theme? { border: "2px solid ",
            borderColor:"#ebb434",
            backgroundColor: "#4152B1" } : { border: "2px solid ",
            borderColor:"#000",
            color: "#000",
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            backgroundColor: "#BBC1D0" }: {}; }}   onClick={ logout} className={theme? 'itemNavbar': 'itemNavbar2'}> Logout</NavLink> 
        {(window.localStorage.getItem('userID') !== adminID) &&
         <NavLink to ="/form" style={({ isActive }) => {  return isActive ? theme? { 
         borderColor:"#ebb434",
         backgroundColor: "#4152B1" } : { border: "2px solid ",
         borderColor:"#000",
         color: "#000",
         boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
         backgroundColor: "#BBC1D0" }: {}; }} 
        className={theme? 'itemNavbar': 'itemNavbar2'}>Schedule days off</NavLink>}
        <NavLink to ="/daysoff"
        style={({ isActive }) => {  return isActive ? theme? { border: "2px solid ",
        borderColor:"#ebb434",
        backgroundColor: "#4152B1" } : { border: "2px solid ",
        borderColor:"#000",
        color: "#000",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        backgroundColor: "#BBC1D0" }: {}; }} 
                className={theme? 'itemNavbar': 'itemNavbar2'}
                 >{(window.localStorage.getItem('userID') !== adminID)? <>See your days off</>: <>Admin Dashboard </>}</NavLink>
          </div>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center",width: "10vw",
    height: "5vh",marginTop:"2rem" }}>
         <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={theme}
      onChange={toggleDarkMode}
      size={30}
    />    </div>
        </div>
      ) : (
        <>
          <div className={theme?"navbar":"navbar2"}> 
          
          
          <NavLink to ="/register"  
                   style={({ isActive }) => {  return isActive ? theme? { border: "2px solid ",
            borderColor:"#ebb434",
            backgroundColor: "#4152B1" } : { border: "2px solid ",
            borderColor:"#000",
            color: "#000",
            backgroundColor: "#BBC1D0" }: {}; }} 
            className={theme? 'itemNavbar': 'itemNavbar2'}>Register</NavLink>
          <NavLink to ="/login" 
                   style={({ isActive }) => {  return isActive ? theme? { border: "2px solid ",
                   borderColor:"#ebb434",
                   backgroundColor: "#4152B1" } : { border: "2px solid ",
                   borderColor:"#000",
                   color: "#000",
                   backgroundColor: "#BBC1D0" }: {}; }} 
            className={theme? 'itemNavbar': 'itemNavbar2'}>Login</NavLink>
                   
               <NavLink to ="/"  
              style={({ isActive }) => {  return isActive ? theme? { border: "2px solid ",
              borderColor:"#ebb434",
              backgroundColor: "#4152B1" } : { border: "2px solid ",
              borderColor:"#000",
              color: "#000",
              backgroundColor: "#BBC1D0" }: {}; }} 
              className={theme? 'itemNavbar': 'itemNavbar2'}>Home</NavLink>
               <DarkModeSwitch
                
                checked={theme}
                onChange={toggleDarkMode}
                size={30}
              />     
          </div>
        </>
      )}
      
    </div>
  );
};


export default Navbar


