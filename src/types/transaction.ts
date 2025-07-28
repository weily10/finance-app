export interface Transaction {
  _id: string;
  price: number;
  company: string;
  type: string;
  stockprice: number,
  stockAmount:number
}


export type NewTransaction = Omit<Transaction, '_id'>;