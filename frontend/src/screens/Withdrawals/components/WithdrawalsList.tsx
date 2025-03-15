import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { Remove } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FUND_MODEL, SUBSCRIBE_FUND_MODEL } from '@models';
import { TransactionType } from '../../../models';
import { useFetchAndLoad } from "../../../hooks";
import { withdrawalFund } from '../../../services';
import ModalConfirmation from '../../../components/ConfirmationDialog';
import { getBalance } from '../../../utilities';
import { useBalance } from '../../../context/BalanceContext';


export default function WithdrawalsList({funds: fundsData}: {funds: FUND_MODEL[]}) {
  const { callEndpoint } = useFetchAndLoad();
  const { setBalance } = useBalance();
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  
  const handleOpen = (fundData: FUND_MODEL) => {
    const data = {
      fund: fundData
    }
    setModalData(data)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  async function handleWithdrawalfund(fund: FUND_MODEL) {
    const dataSubscribeFund: SUBSCRIBE_FUND_MODEL = {
      fund_id: fund.id.toString(),
      customer_id: '66a80ef56a5158fe5cd25891',
      amount: fund.minimum_amount,
      type: TransactionType.WITHDRAWAL
    }
    await callEndpoint(withdrawalFund(dataSubscribeFund));
    handleClose();
    toast.success(`Se retiró del fondo ${fund.name}`, {
      position: "top-right"
    });
    const balance = await getBalance('89indhiauh');
    setBalance(balance);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Valor mínimo de vinculación</TableCell>
              <TableCell align="right">Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundsData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">${row.minimum_amount}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary" 
                    aria-label="withdrawal fund"
                    onClick={() => {handleOpen(row)}}>
                    <Remove  />
                  </IconButton>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalConfirmation
        open={open}
        onClose={handleClose}
        data={modalData}
        onConfirmation={handleWithdrawalfund}
      />
      <ToastContainer />
    </>
  );
}