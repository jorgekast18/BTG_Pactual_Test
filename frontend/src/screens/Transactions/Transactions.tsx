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

          if(response.length > 0){
            response.map(async (transaction: any) => {
              const findClient = await callEndpoint(getClientById(transaction.customer_id));
              const findFund = await callEndpoint(getFundById(transaction.fund_id));
              transactionsData.push({
                id: transaction._id,
                type: transaction.type,
                customer: findClient,
                fund: findFund,
                amount: transaction.amount
              })
            });
            console.log('transactionsData', transactionsData);

            setHistoryTransactionsData(transactionsData);
          }
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