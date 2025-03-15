const urlBase = 'http://127.0.0.1:8000/api/v1';

// Customers
export const getAllCustomersUrl = `${urlBase}/users`

// Funds
export const getAllFunds = `${urlBase}/funds`

// Transactions
export const getAllTransactionsUrl = `${urlBase}/transactions/transactions`
export const subscribeFundUrl = `${urlBase}/customers/funds/subscribe`
export const withdrawalFundUrl = `${urlBase}/customers/funds/withdrawal`
