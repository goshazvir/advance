interface BankSummary {
  bankName: string;
  bankIcon: string;
  accountCount: number;
  totalBalance: number;
}

interface AccountStatusSummary {
  open: number;
  closed: number;
  invalid: number;
  total: number;
}

interface TransactionDirectionSummary {
  creditTotal: number;
  debitTotal: number;
  creditCount: number;
  debitCount: number;
}

interface PortfolioOverview {
  totalBalance: number;
  totalAccounts: number;
  totalTransactions: number;
}

export type {
  BankSummary,
  PortfolioOverview,
  AccountStatusSummary,
  TransactionDirectionSummary,
};
