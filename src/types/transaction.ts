export interface Transaction {
  _id: string;
  amount: number;
  company: string;
  type: string;
  stockprice: number
}


export type NewTransaction = Omit<Transaction, '_id'>;