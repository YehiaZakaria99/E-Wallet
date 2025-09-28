export type Account = {
  id: string;
  name: string;
  type?: string;
  currency?: string;
  balance: number;
  reserved?: number;
};
// #####################

export type totalType = {
  total: number;
  available: number;
  pending: number;
  locked: number;
};
// #####################

export type Transaction = {
    id: string;
    accountId: string;
    date: string; // ISO
    description: string;
    amount: number; // + deposit, - withdrawal
    status: "pending" | "success" | "failed";
    type: "deposit" | "withdrawal" | "transfer";
};