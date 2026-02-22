import ReactDOM from 'react-dom';
import React, {useMemo} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import CreateAccountForm from '@views/accounts/components/CreateAccountForm';

export const useCreateAccount = () => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

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
        <CreateAccountForm />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    CreateAccountDrawer,
  };
};
