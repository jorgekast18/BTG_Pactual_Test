import { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, Divider, IconButton  } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { useFetchAndLoad } from "../../../hooks";
import { CLIENT_MODEL, FUND_MODEL } from '../../../models';
import { getClientById } from '../../../services';
import { Link, useParams } from 'react-router-dom';
import FundsListByClient from './FundsList';
import TransactionList from './TransactionsList';


function ClientDetail() {
  const { callEndpoint } = useFetchAndLoad();
  
  const [clientData, SetClientData] = useState<CLIENT_MODEL>()
  
  const { id } = useParams();

  const fetchClients = async () => {
    const response = await callEndpoint(getClientById(id));
    console.log('API Response:', response);
    const parseDataClient: CLIENT_MODEL = {
      _id: response.id,
      name: response.first_name,
      surnames: response.last_name,
      email: response.email,
      balance: response.balance,
      availableFunds: response.available_funds,
      registeredFunds: response.registered_funds,
      transactions: response.transactions
    }
    SetClientData(parseDataClient);
    console.log('client Data --> ', clientData)
  }
  useEffect(() => { 
    fetchClients();
  }, [id])
  const styles = {
      container: {
        marginTop: 1,
        marginBottom: 5
      },
      card: {
        maxWidth: 800,
        width: 600,
        margin: 'auto',
        padding: '20px 30px',
        borderRadius: 12,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      heading: {
        fontWeight: 600,
      },
      subheading: {
        marginBottom: 1,
        color: '#555',
        fontWeight: 700
      },
      details: {
        marginBottom: 2,
      },
      value: {
        fontWeight: 500,
        color: '#333',
      },
      button: {
        marginTop: 2,
        borderRadius: 8,
        textTransform: 'none',
      },
      backButton: {
        paddin: 1,
      },
      backButtonText: {
          fontSize: '0.875rem',
          color: '#007bff',
          fontWeight: 500,
      },
  };

  
    return (
        <>
            <Container maxWidth="md" sx={styles.container}>
                <Card sx={styles.card}>
                    <CardContent>
                    <Typography variant="h4" component="div" sx={styles.heading}>
                        Detalle
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Grid container spacing={3} sx={styles.details}>
                        <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={styles.subheading}>Nombre:</Typography>
                        <Typography variant="body1" sx={styles.value}>{clientData?.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={styles.subheading}>Apellido:</Typography>
                        <Typography variant="body1" sx={styles.value}>{clientData?.surnames}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={styles.subheading}>Balance:</Typography>
                        <Typography variant="body1" sx={styles.value}>{clientData?.balance}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" sx={styles.subheading}>Email:</Typography>
                        <Typography variant="body1" sx={styles.value}>{clientData?.email}</Typography>
                        </Grid>
                    </Grid>
                    <IconButton 
                        component={Link} 
                        to="/" 
                        sx={styles.backButton}
                        aria-label="back"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body2" sx={styles.backButtonText}>
                        Regresar
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            <FundsListByClient
              customerId={id ? id : ''}
              availableFunds={clientData?.availableFunds ? clientData?.availableFunds : []}
              registeredFunds={clientData?.registeredFunds ? clientData?.registeredFunds : []}
              callback={fetchClients}
            />
            
        </>
    );
}

  export default ClientDetail;