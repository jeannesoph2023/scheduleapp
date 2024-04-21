import React, { useEffect, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GiteIcon from '@mui/icons-material/Gite';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import "../App.css"
import { DatePicker} from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Button, ButtonProps, styled, useMediaQuery } from '@mui/material';
import { purple } from '@mui/material/colors';
import { Moment } from 'moment';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from '../store/store';
import { adminID } from './DaysOffUser';
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

interface UserData {
  email:string;
  _id:string;
  username:string;
}



const FormPage = () => {
 

  const [name, setName] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [meansoftransportation, setMeansOfTransportation] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [ departureday, setDepartureDay] = useState<Moment | null>(moment())
  const [returnday,setReturnDay] = useState<Moment | null>(moment())
  const [observation,setObservation] = useState<string>("")
  const [userData, setUserData] = useState<UserData[] >([])
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );
const submitFormDetails = (event:any) =>{
  
  event.preventDefault()
  axios.post("http://localhost:3001/formdetails", {
    surname: surname,
    name:name,
    meansoftransportation:meansoftransportation,
    observation:observation,
    returnday: returnday?.format("YYYY-MM-DD"),
    departureday: departureday?.format('YYYY-MM-DD'),
    location:location,
    userID: window.localStorage.getItem("userID")
    
  }).then((response) => console.log(response),(error) => {console.log(error)}) 
  setLocation("")
  setSurname("")
  setDepartureDay(moment())
  setReturnDay(moment())
  setName("")
  setMeansOfTransportation("")
  setObservation("")

}

useEffect(() =>{
  axios.get("http://localhost:3001/getUsers")
  .then((response) => setUserData(response.data))
  .catch((error) => console.log(error))
}, [])

console.log(userData)
const matches = useMediaQuery('(max-width:400px)')
  return (
    <div className={theme?"containerFormDaysOff":"containerFormDaysOff2"}>
      <form className={theme?'formDaysOff':'formDaysOff2'} onSubmit={submitFormDetails}>
        
        <div className='bucket2Elements'>
        <div className='itemDaysOffForm'>
          <div style={{display:"flex"}}>
        <AccountCircleIcon  style={{marginBottom:"0.4rem"}}/>
        <label htmlFor="nume">Nume:</label>
        </div>
        <input
          type="text"
          id="nume"
          name="nume"
          value={name}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          
          required
        />
        </div>
        <div className='itemDaysOffForm leftitem'>
          <div style={{display:"flex"}}>
          <AccountCircleIcon style={{marginBottom:"0.4rem"}}/>
          <label htmlFor="prenume">Prenume:</label>
          </div>
       
        <input
          type="text"
          id="prenume"
          name="prenume"
           value ={surname}
          onChange = {(event:React.ChangeEvent<HTMLInputElement>) => setSurname(event.target.value)}
          required
        />
        </div>
        </div>
        <div className='bucket2Elements'>
        <div className='itemDaysOffForm'>
          <div  style={{display:"flex"}}>
            <GiteIcon style={{marginBottom:"0.4rem"}}/>
            <label htmlFor="locatie">Locație:</label>
          </div>
       
        <input
          type="text"
          id="locatie"
          name="locatie"
           value={location}
         onChange = {(event:React.ChangeEvent<HTMLInputElement>) => setLocation(event.target.value)}
          required
        />
        </div>
        <div className='itemDaysOffForm leftitem'>
          <div style={{display:"flex"}}>
            <DirectionsCarIcon style={{marginBottom:"0.4rem"}}/>
            <label htmlFor="transport">Mijloc de transport:</label>
          </div>
       
        <input
          type="text"
          id="transport"
          name="transport"
          value={meansoftransportation}
          onChange = {(event:React.ChangeEvent<HTMLInputElement>) => setMeansOfTransportation(event.target.value)}
          required
        />
        </div>
        </div>
        
       
        <div className='bucket2Elements'>
        <div className='itemDaysOffForm'>
          <div style={{display:"flex"}}>
            <ThumbUpOffAltIcon style={{marginBottom:"0.4rem"}}/>
          <label> Zi plecare</label>
          </div>
      
        <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker className='dataPicker' value={departureday} onChange={(newValue:Moment | null) => setDepartureDay(newValue)} />
    </LocalizationProvider>
       
        </div>
        <div className='itemDaysOffForm leftitem'>
          <div style={{display:"flex"}}>
            <ThumbDownOffAltIcon style={{marginBottom:"0.4rem"}}/>
          <label> Zi revenire</label>

          </div>
     
        <LocalizationProvider dateAdapter={AdapterMoment} >
      <DatePicker  className='dataPicker' value={returnday}  onChange ={(newValue:Moment|null) => setReturnDay(newValue)} />
      </LocalizationProvider>
        </div>
        </div>
        <div className='buttontextarea'>
        <textarea rows={matches?10:6} style={{padding:"12px 20px",fontFamily:"serif",fontSize:"1rem"}} cols={matches?25:60} maxLength={75} name="observatie" onChange = {(event:React.ChangeEvent<HTMLTextAreaElement>) => setObservation(event.target.value)} placeholder='Observații: Număr de zile în plus, justificarea lor etc.'/>
        <ColorButton variant="contained" type="submit" size="large" style={{margin:"2rem 0rem"}}>
          Submit
        </ColorButton>
        </div>
       
      </form>
    </div>
  )
}

export default FormPage

