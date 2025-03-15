import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import moment from 'moment';
import { TRANSACION_MODEL } from '@models';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { TransactionType } from '../../../models';

const StyledTableContainer = styled(TableContainer)({
    margin: '20px auto',
    maxWidth: '90%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledTableCell = styled(TableCell)({
    fontWeight: '600',
    padding: '12px 16px',
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9',
    },
    '&:hover': {
        backgroundColor: '#f1f1f1',
    },
});

const TransactionTypeInCell = styled(TableCell)(() => ({
    color: '#28a745',
    fontWeight: 'bold',
    paddingLeft: 10
}));

const TransactionTypeOutCell = styled(TableCell)(() => ({
    color: '#dc3545',
    fontWeight: 'bold',
    paddingLeft: 10
}));

const TransactionList = ({ transactions: transactionData }: {transactions: TRANSACION_MODEL[]}) => {
    return (
        <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Historial de Transacciones
            </Typography>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Tipo de transacción</StyledTableCell>
                            <StyledTableCell align="right">Valor</StyledTableCell>
                            <StyledTableCell align="right">Fecha</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionData.map((transaction) => (
                            <StyledTableRow key={transaction.id}>
                                {
                                    transaction.type === TransactionType.SUBSCRIPTION 
                                        ?   <TransactionTypeInCell align='center'>
                                                <CallMadeIcon style={{ paddingRight: 10}}>
                                                    
                                                </CallMadeIcon>
                                                Inscripción
                                            </TransactionTypeInCell>
                                        :   <TransactionTypeOutCell align='center'>
                                                <CallReceivedIcon style={{ paddingRight: 10}}>
                                                    
                                                </CallReceivedIcon>
                                                Retiro
                                            </TransactionTypeOutCell>
                                }
                                
                                <StyledTableCell align="right" style={{ color: '#007bff' }}>
                                    ${transaction.amount.toLocaleString()}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{ color: '#6c757d' }}>
                                    {moment(transaction.date).format('MMMM D YYYY')}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    );
};

export default TransactionList;
