import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { useCookies } from 'react-cookie'
import { Button } from '@mui/material'

const Navbar = () => {
  const [cookies, setCookie,removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate()
  const logout = () =>{
    navigate("/")
    removeCookie('access_token')
  }
  return (
    <div className='navbar'> 
      {cookies.access_token ? (
        <div className='navbar'>
        <div onClick={ logout} className='itemNavbar'>Logout</div>
        <Link to ="/form" className='itemNavbar'>Schedule days off</Link>
        <Link to ="/daysoff" className='itemNavbar'>See your days off</Link>
        </div>
      ) : (
        <>
          <div className='navbar'> 
          <Link to ="/register" className='itemNavbar'>Register</Link>
          <Link to ="/login" className='itemNavbar'>Login</Link>
          </div>
        </>
      )}
    </div>
  );
};


export default Navbar


