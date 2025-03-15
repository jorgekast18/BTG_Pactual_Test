import { useEffect, useState } from "react"
import WithdrawalsList from "./components/WithdrawalsList"
import { FUND_MODEL } from "@models"
import { useFetchAndLoad } from "../../hooks";
import { getFundsAvailable } from "../../services";

export const Withdrawals = () => {
  const { callEndpoint } = useFetchAndLoad();
    const [fundsData, setFundsData] = useState<FUND_MODEL[]>([])

    useEffect(() => {        
        const fetchClients = async () => {
          const response: [] = await callEndpoint(getFundsAvailable());
          const fundsWithdrawalData: FUND_MODEL[] = []

          if(response.length > 0){
            response.map((fund: any) => {
              fundsWithdrawalData.push({
                id: fund._id,
                name: fund.name,
                minValue: fund.minimum_amount,
                category: fund.category
              })
            })

            setFundsData(fundsWithdrawalData);
          }
        }
            
        fetchClients();
      }, []);
      return (
        <>
          <div>
              <h1>Cancelación de fondo</h1>
              <WithdrawalsList
                  funds={fundsData}
              />
          </div>        
        </>
        
      )
  }