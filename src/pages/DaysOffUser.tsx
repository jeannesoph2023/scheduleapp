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


import { Box } from '@mui/material';
import axios from 'axios';
interface Column {
  id: 'name' | 'surname' | 'departureday' | 'returnday' | 'location' | 'meansoftransportation' | 'observations';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nume', minWidth: 100,  },
  { id: 'surname', label: 'Prenume', minWidth: 100 },
  {
    id: 'departureday',
    label: 'Data plecarii',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'returnday',
    label: 'Data intoarcerii',
    minWidth: 120,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'location',
    label: 'Locatie',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'meansoftransportation',
    label: 'Mijloc de transport',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'observations',
    label: 'Observatii',
    minWidth: 100,
    align: 'right',
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
  {id:'observations', emoji:<PriorityHighIcon/>}
]
interface Data {
  name: string;
  surname: string;
  returnday: string;
  departureday: string;
  location: string;
  meansoftransportation:string;
  observations:string;
}
function createData(
  name: string,
  surname: string,
  returnday: string,
  departureday: string,
  location: string,
  meansoftransportation:string,
  observations:string
): Data {

  return { name, surname, returnday, departureday, location, meansoftransportation,observations };
}

const rows = [
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2 zile'),
  createData('Sofia', 'Ioana', '01.09.2024', '01.11.2024','Paris','Avion','Sejour 2'),
];

const DaysOffUser = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [formsData, setFormsData] = useState<Data[]>([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect( () =>{
    axios.get("http://localhost:3001/formdetails")
    .then(response => setFormsData(response.data))
    .catch((error) => console.log(error))
  },[])
  return (
    <div className='containerFormDaysOff'>
     
      <Paper sx={{ width: '100%', overflow: 'hidden', margin:"0px 45px" }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
              

                  {emoji.find((item) => item.id === column.id)?.emoji} {column.label}
                 
                
                
                </TableCell>
            
              ))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {formsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.name}>
                    {columns.map((column) => {
                      const value = data[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
    </div>
  )
}

export default DaysOffUser
