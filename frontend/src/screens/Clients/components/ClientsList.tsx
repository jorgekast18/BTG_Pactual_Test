import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CLIENT_MODEL } from '@models';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function ClientsList({clients: clientsData}: {clients: CLIENT_MODEL[]}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minW_idth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientsData.map((client) => (
              <TableRow
                key={client._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{client.name}</TableCell>
                <TableCell align="right">{client.surnames}</TableCell>
                <TableCell align="right">{client.balance}</TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/client/${client._id}`} 
                    variant="contained" 
                    color="primary"
                  >
                    Ver Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}