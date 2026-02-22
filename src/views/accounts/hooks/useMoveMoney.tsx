import type {Account} from '@/domain/Account';

import ReactDOM from 'react-dom';
import {toast} from 'react-toastify';
import React, {useCallback, useMemo, useState} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import MoveMoneyForm from '@views/accounts/components/MoveMoneyForm';

interface UseMoveMoneOptions {
  onSuccess?: () => void;
}

export const useMoveMoney = (options?: UseMoveMoneOptions) => {
  const {value: isOpen, onTrue: open, onFalse: close} = useBoolean();
  const [prefilledSourceAccount, setPrefilledSourceAccount] =
    useState<Account | null>(null);

  const openDrawer = useCallback(
    (account?: Account) => {
      setPrefilledSourceAccount(account ?? null);
      open();
    },
    [open],
  );

  const closeDrawer = useCallback(() => {
    close();
    setPrefilledSourceAccount(null);
  }, [close]);

  const handleSuccess = useCallback(() => {
    toast.success('Transfer completed successfully');
    closeDrawer();
    options?.onSuccess?.();
  }, [closeDrawer, options]);

  const MoveMoneyDrawer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <DrawerWrapper
        open={isOpen}
        removePaddingBottom
        onClose={closeDrawer}
        actions={[
          {
            icon: 'fluent--dismiss-24-regular',
            onClick: closeDrawer,
          },
        ]}
        drawerWidth='md'
      >
        <MoveMoneyForm
          isOpen={isOpen}
          onSuccess={handleSuccess}
          prefilledSourceAccount={prefilledSourceAccount}
        />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, handleSuccess, prefilledSourceAccount]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    MoveMoneyDrawer,
  };
};
