enum TransactionDirection {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
}

interface Transaction {
  transaction_id: string;
  merchant: string;
  amount: number;
  direction: TransactionDirection;
  created_at: string;
  account_id: string;
  status: TransactionStatus;
  extra_data: Record<string, unknown>;
  user_created: boolean;
  account_name: string;
}

export {TransactionStatus, TransactionDirection};
export type {Transaction};
