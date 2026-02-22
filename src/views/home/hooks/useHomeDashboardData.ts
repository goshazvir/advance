import type {Transaction} from '@/domain/Transaction';
import type {
  AccountStatusSummary,
  BankSummary,
  PortfolioOverview,
  TransactionDirectionSummary,
} from '@views/home/domain/HomeDashboard';

import {useMemo} from 'react';

import {AccountStatus} from '@/domain/Account';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import {TransactionDirection} from '@/domain/Transaction';
import useFetchTransactions from '@views/transactions/hooks/useFetchTransactions';

const useHomeDashboardData = () => {
  const {data: accounts, isLoading: isLoadingAccounts} = useFetchAccounts();

  const {data: transactions, isLoading: isLoadingTransactions} =
    useFetchTransactions();

  const portfolioOverview = useMemo<PortfolioOverview>(() => {
    const totalBalance =
      accounts?.reduce((sum, acc) => sum + acc.balance, 0) ?? 0;
    return {
      totalBalance,
      totalAccounts: accounts?.length ?? 0,
      totalTransactions: transactions?.length ?? 0,
    };
  }, [accounts, transactions]);

  const topBanksByAccounts = useMemo<BankSummary[]>(() => {
    if (!accounts) return [];
    const bankMap = new Map<string, BankSummary>();
    for (const account of accounts) {
      const existing = bankMap.get(account.bank_name);
      if (existing) {
        existing.accountCount += 1;
        existing.totalBalance += account.balance;
      } else {
        bankMap.set(account.bank_name, {
          bankName: account.bank_name,
          bankIcon: account.bank_icon,
          accountCount: 1,
          totalBalance: account.balance,
        });
      }
    }
    return [...bankMap.values()]
      .sort(
        (a, b) =>
          b.accountCount - a.accountCount ||
          a.bankName.localeCompare(b.bankName),
      )
      .slice(0, 3);
  }, [accounts]);

  const topBanksByFunds = useMemo<BankSummary[]>(() => {
    if (!accounts) return [];
    const bankMap = new Map<string, BankSummary>();
    for (const account of accounts) {
      const existing = bankMap.get(account.bank_name);
      if (existing) {
        existing.accountCount += 1;
        existing.totalBalance += account.balance;
      } else {
        bankMap.set(account.bank_name, {
          bankName: account.bank_name,
          bankIcon: account.bank_icon,
          accountCount: 1,
          totalBalance: account.balance,
        });
      }
    }
    return [...bankMap.values()]
      .sort(
        (a, b) =>
          b.totalBalance - a.totalBalance ||
          a.bankName.localeCompare(b.bankName),
      )
      .slice(0, 3);
  }, [accounts]);

  const recentTransactions = useMemo<Transaction[]>(() => {
    if (!transactions) return [];
    return [...transactions]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5);
  }, [transactions]);

  const accountStatusSummary = useMemo<AccountStatusSummary>(() => {
    if (!accounts) return {open: 0, closed: 0, invalid: 0, total: 0};
    const summary = {open: 0, closed: 0, invalid: 0, total: accounts.length};
    for (const account of accounts) {
      if (account.status === AccountStatus.OPEN) summary.open += 1;
      else if (account.status === AccountStatus.CLOSED) summary.closed += 1;
      else if (account.status === AccountStatus.INVALID) summary.invalid += 1;
    }
    return summary;
  }, [accounts]);

  const transactionVolumeSummary = useMemo<TransactionDirectionSummary>(() => {
    if (!transactions)
      return {creditTotal: 0, debitTotal: 0, creditCount: 0, debitCount: 0};
    const summary = {
      creditTotal: 0,
      debitTotal: 0,
      creditCount: 0,
      debitCount: 0,
    };
    for (const tx of transactions) {
      if (tx.direction === TransactionDirection.CREDIT) {
        summary.creditTotal += tx.amount;
        summary.creditCount += 1;
      } else {
        summary.debitTotal += tx.amount;
        summary.debitCount += 1;
      }
    }
    return summary;
  }, [transactions]);

  return {
    portfolioOverview,
    topBanksByAccounts,
    topBanksByFunds,
    recentTransactions,
    accountStatusSummary,
    transactionVolumeSummary,
    isLoading: {
      accounts: isLoadingAccounts,
      transactions: isLoadingTransactions,
    },
  };
};

export default useHomeDashboardData;
