import { FUND_MODEL } from "./fund.model";
import { TRANSACION_MODEL } from "./transaction.model";

export interface CLIENT_MODEL {
    _id: number;
    name: string;
    surnames: string;
    balance: number;
    email?: '';
    phone?: '';
    registeredFunds?: FUND_MODEL[];
    availableFunds?: FUND_MODEL[];
    transactions?: TRANSACION_MODEL
}