import { useEffect, useState } from "react"
import FundsAvailableList from "./components/FundsList"
import { FUND_MODEL } from "@models"
import { getFundsAvailable } from "../../services";
import { useFetchAndLoad } from "../../hooks";

export const Openings = () => {
  const { callEndpoint } = useFetchAndLoad();
    const [fundsData, setFundsData] = useState<FUND_MODEL[]>([])

    useEffect(() => {        
        const fetchFundsAvailable = async () => {
          const response: [] = await callEndpoint(getFundsAvailable());
          const fundsAvailableData: FUND_MODEL[] = []

          if(response.length > 0){
            response.map((fund: any) => {
              fundsAvailableData.push({
                id: fund._id,
                name: fund.name,
                minValue: fund.minimum_amount,
                category: fund.category
              })
            })

            setFundsData(fundsAvailableData);
          }
        }
            
        fetchFundsAvailable();
      }, [])
    return (
      <>
        <div>
            <h1>Aperturar Fondo</h1>
            <FundsAvailableList
                funds={fundsData}
            />
        </div>        
      </>
      
    )
  }