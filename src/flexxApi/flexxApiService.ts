import type {MoveMoneyPayload} from '@/domain/MoveMoneyPayload';

import {Transaction} from '@/domain/Transaction';
import {Account, AccountStatus} from '@/domain/Account';
import {get, post, put, remove} from '@/flexxApi/FlexxApiClientService';

interface CreateAccountPayload {
  name: string;
  routing_number: string;
  account_number: string;
  bank_name: string;
  bank_icon: string;
  status: AccountStatus;
  balance: number;
}

class FlexxApiService {
  private formatQueryParams(
    params?: Record<
      string,
      string | number | boolean | undefined | string[] | number[] | Date
    >,
  ): string {
    if (!params) return '';
    const queryParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, String(item)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    }
    return queryParams.toString();
  }

  async fetchAccounts(params: {search_term?: string}): Promise<Account[]> {
    const queryParams = this.formatQueryParams(params);
    return get<Account[]>({endpoint: `pages/accounts?${queryParams}`});
  }

  async fetchAccount(accountId: string): Promise<Account> {
    return get<Account>({endpoint: `pages/accounts/${accountId}`});
  }

  async fetchAccountTransactions(
    accountId: string,
    params?: {search_term?: string},
  ): Promise<Transaction[]> {
    const queryParams = this.formatQueryParams(params);
    return get<Transaction[]>({
      endpoint: `pages/accounts/${accountId}/transactions?${queryParams}`,
    });
  }

  async createAccount(payload: CreateAccountPayload): Promise<Account> {
    return post<Account>({endpoint: 'pages/accounts', body: payload});
  }

  async moveMoney(payload: MoveMoneyPayload): Promise<Transaction[]> {
    return post<Transaction[]>({endpoint: 'pages/move-money', body: payload});
  }
}

let instance: FlexxApiService | null = null;

const flexxApiService = (): FlexxApiService => {
  if (!instance) {
    instance = new FlexxApiService();
  }

  return instance;
};

export default flexxApiService;

export type {CreateAccountPayload};
export {get, put, post, remove, FlexxApiService};
