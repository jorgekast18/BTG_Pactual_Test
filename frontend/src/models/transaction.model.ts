import { CLIENT_MODEL } from "./clients.model";
import { FUND_MODEL } from "./fund.model";

export enum TransactionType {
    SUBSCRIPTION = 'IN',
    WITHDRAWAL = 'OUT'
}

export interface TRANSACION_MODEL {
    id: string;
    type: TransactionType;
    
    date?: Date;
    amount: number;
}