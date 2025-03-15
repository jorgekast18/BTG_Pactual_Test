import axios from "axios";
import { getAllCustomersUrl } from '../constants/urls';

export const getBalance = async (customerId: string | undefined) => {
    
    const response = await axios.get(`${getAllCustomersUrl}/${customerId}`);
    
    return response.data.balance;

}