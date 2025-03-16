import { useEffect, useState } from "react"
import TransactionsList from "./components/TransactionsList"
import { TRANSACION_MODEL } from "@models"
import { useFetchAndLoad } from "../../hooks";
import { getClientById, historyTransactions, getFundById } from "../../services";

export const Transactions = () => {
  const { callEndpoint } = useFetchAndLoad();
    const [historyTransactionsData, setHistoryTransactionsData] = useState<TRANSACION_MODEL[]>([])

    useEffect(() => {        
        const fetchHistoryTransactions = async () => {
          const response: [] = await callEndpoint(historyTransactions());
          const transactionsData: TRANSACION_MODEL[] = [];

        }
            
        fetchHistoryTransactions();
      }, []);
      return (
        <>
          <div>
              <h1>Historial de transacciones</h1>
              <TransactionsList
                transaction={historyTransactionsData}
              />
          </div>        
        </>
        
      )
  }