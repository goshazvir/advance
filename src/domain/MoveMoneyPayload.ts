interface MoveMoneyPayload {
  source_account_id: string;
  destination_account_id: string;
  amount: number;
  merchant: string;
}

export type {MoveMoneyPayload};
