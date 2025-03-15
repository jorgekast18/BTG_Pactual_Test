export interface FUND_MODEL {
    _id: string;
    name: string;
    minimum_amount: number;
    category: string;
    date?: string;

}

export interface SUBSCRIBE_FUND_MODEL {
    fund_id: string;
    customer_id: string;
    amount: number;
    type: string;
}