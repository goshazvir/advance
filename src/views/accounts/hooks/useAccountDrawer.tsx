import ReactDOM from 'react-dom';
import React, {useCallback, useMemo, useState} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import AccountDrawer from '@views/accounts/components/AccountDrawer';

export const useAccountDrawer = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const {value: isOpen, onTrue: open, onFalse: close} = useBoolean();

  const openDrawer = useCallback(
    (accountId: string) => {
      setSelectedAccountId(accountId);
      open();
    },
    [open],
  );

  const closeDrawer = useCallback(() => {
    close();
    setSelectedAccountId(null);
  }, [close]);

  const AccountDrawerPortal = useMemo(() => {
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
        drawerWidth='lg'
      >
        {selectedAccountId && <AccountDrawer accountId={selectedAccountId} />}
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, selectedAccountId]);

  return {
    isOpen,
    selectedAccountId,
    openDrawer,
    closeDrawer,
    AccountDrawerPortal,
  };
};
