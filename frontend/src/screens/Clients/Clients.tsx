import React, { useEffect, useState } from "react";

import { CLIENT_MODEL } from "@models";
import { getAllClients } from '../../services';
import ClientsList from "./components/ClientsList"
import { useFetchAndLoad } from "../../hooks";

export const Clients = () => {
  const { callEndpoint } = useFetchAndLoad();
  const [clientsList, setClientsList] = useState<CLIENT_MODEL[]>([])
 
  useEffect(() => {
      const fetchClients = async () => {
        console.log('llego a la funcion')
        
        const response: [] = await callEndpoint(getAllClients());
        const clientListResponse: CLIENT_MODEL[] = [];

        if(response.length > 0){

          response.map((client: any) => {
            clientListResponse.push({
              _id: client._id,
              name: client.first_name,
              surnames: client.last_name,
              balance: client.balance,
              funds: client.funds,
              transactions: client.transactions
            })
          })

          console.log('response --> ', response)
          setClientsList(clientListResponse);
        }
      
    } 
    fetchClients();
  },[])

  return (
    <>
      <div>
      <h1>Cliente</h1>
      <ClientsList
        clients={clientsList}
      />
    </div>
    </>
    
  )
}