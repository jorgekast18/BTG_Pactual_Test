export interface FUND_MODEL {
    _id: string;
    name: string;
    minimum_balance: number;
    category: string;
    date?: string;

}

export interface SUBSCRIBE_FUND_MODEL {
    id: string;
    name: string;
    minimum_balance: number;
    category: string;
}

export interface WITHDRAWAL_FUND_MODEL {
    id: string;
    name: string;
    minimum_balance: number;
    category: string;
}