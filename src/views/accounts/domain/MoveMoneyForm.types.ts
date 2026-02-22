interface MoveMoneyFormValues {
  source_account_id: string;
  destination_account_id: string;
  amount: string;
  confirmed: boolean;
}

const moveMoneyFormDefaults: MoveMoneyFormValues = {
  source_account_id: '',
  destination_account_id: '',
  amount: '',
  confirmed: false,
};

export {moveMoneyFormDefaults};
export type {MoveMoneyFormValues};
