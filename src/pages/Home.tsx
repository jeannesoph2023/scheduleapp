import React, { CSSProperties } from 'react';
import Button from "@mui/material/Button";
import "../App.css"
import { useNavigate } from 'react-router-dom';
import {SyncLoader} from 'react-spinners'
import { store } from '../store/store';
import { useSelector } from 'react-redux';
import { red } from '@mui/material/colors';
const override: CSSProperties = {
  
 color:"rgba(23, 162, 230, 1)"
};

const Home = () => {
  const navigate = useNavigate()
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );

  return (
    <div className={theme?"containerHomePage":"containerHomePage2"}>
        
        <h1 className={!theme?'homeTitle rainbow-text':'homeTitleDark rainbow-text'}>Days off are waiting to be scheduled</h1> 
        {theme?<SyncLoader  cssOverride={override}
        size={30} speedMultiplier={0.5} />:<SyncLoader color="#000" size={30} speedMultiplier={0.5} />}
        
      
      
    </div>
  );
}

export default Home;

