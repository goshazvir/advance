import type {Account} from '@/domain/Account';

import ReactDOM from 'react-dom';
import React, {useCallback, useMemo} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import CreateAccountForm from '@views/accounts/components/CreateAccountForm';

interface UseCreateAccountOptions {
  onSuccess?: (account: Account) => void;
}

export const useCreateAccount = (options?: UseCreateAccountOptions) => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

  const handleSuccess = useCallback(
    (account: Account) => {
      closeDrawer();
      options?.onSuccess?.(account);
    },
    [closeDrawer, options],
  );

  const CreateAccountDrawer = useMemo(() => {
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
        <CreateAccountForm
          isOpen={isOpen}
          onSuccess={handleSuccess}
          onClose={closeDrawer}
        />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, handleSuccess]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    CreateAccountDrawer,
  };
};
