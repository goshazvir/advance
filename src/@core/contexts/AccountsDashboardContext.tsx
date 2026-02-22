'use client';
import React, {createContext, useEffect, useState} from 'react';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type AccountsDashboardContextType = {
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
};

export const AccountsDashboardContext = createContext<
  AccountsDashboardContextType | undefined
>(undefined);

export const AccountsDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accountIdFromParams = searchParams.get('account_id');
    if (accountIdFromParams) {
      setSelectedAccountId(accountIdFromParams);
    }
  }, [searchParams]);

  const handleSetSelectedAccountId = (id: string | null) => {
    setSelectedAccountId(id);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('account_id', id ?? '');

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <AccountsDashboardContext.Provider
      value={{
        selectedAccountId,
        setSelectedAccountId: handleSetSelectedAccountId,
      }}
    >
      {children}
    </AccountsDashboardContext.Provider>
  );
};
