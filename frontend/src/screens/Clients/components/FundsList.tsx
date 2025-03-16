import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { toast, ToastContainer } from 'react-toastify';
import { Typography, IconButton } from '@mui/material';

import ModalConfirmation from '../../../components/ConfirmationDialog';
import { FUND_MODEL, SUBSCRIBE_FUND_MODEL, WITHDRAWAL_FUND_MODEL } from '@models';
import { useFetchAndLoad } from "../../../hooks";
import { getBalance } from '../../../utilities';
import { useBalance } from '../../../context/BalanceContext';
import { withdrawalFund, getFundsAvailable, subscribeFund } from '../../../services';
import ModalTransaction from '../../../components/ModalTransaction';

export default function FundsListByClient({ customerId, availableFunds, registeredFunds, callback }: { customerId: string, availableFunds: FUND_MODEL[], registeredFunds: FUND_MODEL[], callback: () => void }) {
    const [registeredFundsList, setRegisteredFundsList] = useState<FUND_MODEL[]>([]);
    const [fundsAvailableData, setFundsAvailableData] = useState<FUND_MODEL[]>([]);
    const [modalData, setModalData] = useState({});
    const [modalDataSubscription, setModalDataSubscription] = useState({});
    const { callEndpoint } = useFetchAndLoad();
    const { setBalance } = useBalance();
    const [openSubscribeFund, setOpenSubscribeFund] = useState(false);
    const [open, setOpen] = useState(false);

    const styles = {
        heading: {
            fontWeight: 600,
        },
    };

    useEffect(() => {
        setFundsAvailableData(availableFunds);
        setRegisteredFundsList(registeredFunds);
    }, []);

    async function handleWithdrawalfund(fund: any) {
        try {
            const fundToWithdrawal: WITHDRAWAL_FUND_MODEL = {
                id: fund.id,
                name: fund.name,
                minimum_balance: fund.minimum_balance,
                category: fund.category
            }
            await callEndpoint(withdrawalFund(customerId, fundToWithdrawal));
            callback();
            const balance = await getBalance(customerId);
            setBalance(balance);

            toast.success(`Se retiró del fondo ${fund.name}`, {
                position: "top-right",
            });

            handleClose();
        } catch (error) {
            toast.error("Ocurrió un error al retirar el fondo", {
                position: "top-right",
            });
        }
    }

    async function handleSubscribefund(fund: any) {
        const fundToSubscribe: SUBSCRIBE_FUND_MODEL = {
            id: fund.id,
            name: fund.name,
            minimum_balance: fund.minimum_balance,
            category: fund.category
        }
        try {
            const subscribeResponse = await callEndpoint(subscribeFund(customerId, fundToSubscribe));
            if (subscribeResponse.error && subscribeResponse.error === 'Without Balance') {
                toast.warning(`No tiene saldo disponible para vincularse al fondo. ${fund.name}`, {
                    position: "top-right",
                    autoClose: 1000
                });
                return;
            }

            callback();
            const balance = await getBalance(customerId);
            setBalance(balance);

            toast.success(`Se suscribió al fondo ${fund.name}`, {
                position: "top-right",
                autoClose: 1000
            });
            handleCloseSubscribeFund();
        } catch (error) {
            toast.error("Ocurrió un error al suscribirse al fondo", {
                position: "top-right",
            });
        }
    }

    const handleOpen = (fundData: FUND_MODEL) => {
        setModalData({ fund: fundData });
        setOpen(true);
    };
    
    const handleOpenSubscribeFund = (fundData: FUND_MODEL) => {
        setModalDataSubscription({
            title: 'Inscripción a fondo',
            content: `Se va a inscribir al fondo: ${fundData.name}`,
            fund: fundData
        });
        setOpenSubscribeFund(true);
    };

    const handleClose = () => setOpen(false);
    const handleCloseSubscribeFund = () => setOpenSubscribeFund(false);

    return (
        <div>
            <Typography variant="h4" component="div" sx={styles.heading}>
                Fondos Inscritos
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Valor</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { registeredFunds && registeredFunds.length > 0 ? registeredFunds.map((fund) => (
                            <TableRow
                                key={fund._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{fund.name}</TableCell>
                                <TableCell align="right">${Number(fund.minimum_balance).toLocaleString()}</TableCell>
                                <TableCell align="right">{fund.category}</TableCell>
                                <TableCell align="right">{moment(fund.date).format('MMMM D YYYY')}</TableCell>
                                <TableCell align="right">
                                    <IconButton 
                                        color="primary" 
                                        aria-label="withdrawal fund"
                                        onClick={() => handleOpen(fund)}
                                    >
                                        <PersonRemoveIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) : <h2>No hay fondos inscritos</h2>}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalConfirmation
                open={open}
                onClose={handleClose}
                data={modalData}
                onConfirmation={handleWithdrawalfund}
            />
            <Typography variant="h4" component="div" sx={styles.heading}>
                Fondos Disponibles
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Valor</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {availableFunds && availableFunds.length > 0 ? availableFunds.map((fund) => (
                            <TableRow
                                key={fund._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{fund.name}</TableCell>
                                <TableCell align="right">${Number(fund.minimum_balance).toLocaleString()}</TableCell>
                                <TableCell align="right">{fund.category}</TableCell>
                                <TableCell align="right">
                                    <IconButton 
                                        color="primary" 
                                        aria-label="subscribe fund"
                                        onClick={() => handleOpenSubscribeFund(fund)}
                                    >
                                        <PersonAddAlt1Icon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )):  <h2>No hay fondos disponibles</h2>}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalTransaction
                open={openSubscribeFund}
                onClose={handleCloseSubscribeFund}
                data={modalDataSubscription}
                callback={handleSubscribefund}
            />
            <ToastContainer />
        </div>
    );
}
