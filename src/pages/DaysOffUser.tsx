import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GiteIcon from '@mui/icons-material/Gite';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditIcon from '@mui/icons-material/Edit';


import axios from 'axios';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { store } from '../store/store';

interface Column {
  id: 'name' | 'surname' | 'departureday' | 'returnday' | 'location' | 'meansoftransportation' | 'observation';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nume', minWidth: 100,  },
  { id: 'surname', label: 'Prenume', minWidth: 100 },
  {
    id: 'departureday',
    label: 'Data plecarii',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'returnday',
    label: 'Data intoarcerii',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'location',
    label: 'Locatie',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'meansoftransportation',
    label: 'Mijloc de transport',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'observation',
    label: 'Observatii',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
];
const emoji = [
  {id:'name', emoji:<AccountCircleIcon />},
  {id:'surname', emoji:<AccountCircleIcon />},
  {id:'departureday', emoji:<ThumbUpOffAltIcon/>},
  {id:'returnday', emoji:<ThumbDownOffAltIcon/>},
  {id:'location', emoji:<GiteIcon/>},
  {id:'meansoftransportation', emoji:<DirectionsCarIcon/>},
  {id:'observation', emoji:<PriorityHighIcon/>}
]
interface Data {
  name: string;
  surname: string;
  returnday: string;
  departureday: string;
  location: string;
  meansoftransportation:string;
  observation:string;
  userID: string;
}

export const adminID = '6613cea1f82fafcef9dc98cc'

const DaysOffUser = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [formsData, setFormsData] = useState<Data[]>([]);

  const [cookies, setCookie,removeCookie] = useCookies(["access_token"])
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const theme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.theme.activeTheme
  );
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   



  useEffect( () =>{
    
    axios.get("http://localhost:3001/formdetails",{headers:{"Authorization":`Bearer ${cookies.access_token}` }})
    .then((response) => setFormsData(response.data))
    .catch((error) => console.log(error))
  },[])
  const filteredDataByCurrentUserID = formsData.filter((formData) => {
    return formData.userID === window.localStorage.getItem('userID');
  });


  return (
    <div className={theme?"containerFormDaysOff":"containerFormDaysOff2"}>
     
      <Paper sx={{ width: '80%', overflow: 'hidden', margin:"0px 3rem" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:"#ebb434", fontSize:"0.8rem",fontWeight:"bolder"}}
                  
                >
              

                  <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                    <div style={{marginRight:"0.5rem"}}> {emoji.find((item) => item.id === column.id)?.emoji}</div>
                    <div>{column.label}</div>
                  </div> 
                 
                
                
                </TableCell>
            
              ))}
              
            </TableRow>
          </TableHead>
          {window.localStorage.getItem('userID') === adminID? (<TableBody>
            {formsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.name}>
                    {columns.map((column) => {
                      const value = data[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontSize:"0.6rem",fontWeight:"bold",textAlign:"center"}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>):(
          <TableBody>
            {filteredDataByCurrentUserID
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.name} style={{backgroundColor:"#f2e2a7"}}>
                    {columns.map((column) => {
                      const value = data[column.id];
                      return (
                       
                        <TableCell key={column.id} align={column.align} style={{fontSize:"0.6rem",fontWeight:"bold",textAlign:"center"}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                           
                        </TableCell>
                        
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> )}
          
          
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={window.localStorage.getItem('userID') === adminID?formsData.length:filteredDataByCurrentUserID.length}
        rowsPerPage={rowsPerPage}
        style={{backgroundColor:"#ebb434"}}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   
    </div>
  )
}

export default DaysOffUser
