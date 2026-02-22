'use client';

import type {Account} from '@/domain/Account';
import type {CreateAccountPayload} from '@/flexxApi/flexxApiService';

import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {AccountStatus} from '@/domain/Account';
import {Alert, Button, Stack, Typography} from '@mui/material';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import useCreateAccountMutation from '@views/accounts/hooks/useCreateAccountMutation';
import {buildValidationRules} from '@components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators';

interface CreateAccountFormValues {
  name: string;
  bank_name: string;
  routing_number: string;
  account_number: string;
}

interface CreateAccountFormProps {
  isOpen?: boolean;
  onSuccess?: (account: Account) => void;
  onClose?: () => void;
}

const defaultValues: CreateAccountFormValues = {
  name: '',
  bank_name: '',
  routing_number: '',
  account_number: '',
};

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  isOpen,
  onSuccess,
}) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {control, handleSubmit, reset} = useForm<CreateAccountFormValues>({
    defaultValues,
  });

  const {mutate, isLoading} = useCreateAccountMutation({
    onSuccess: data => {
      setServerError(null);
      onSuccess?.(data);
    },
    onError: error => {
      setServerError(
        error.message || 'Failed to create account. Please try again.',
      );
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
      setServerError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = (formValues: CreateAccountFormValues) => {
    setServerError(null);
    const payload: CreateAccountPayload = {
      ...formValues,
      bank_icon: '',
      status: AccountStatus.OPEN,
      balance: 0,
    };
    mutate(payload);
  };

  return (
    <Stack gap={'1.5rem'}>
      <Typography variant='h5' sx={{fontWeight: 600}}>
        Create Account
      </Typography>

      <Stack component='form' gap={'1.25rem'} onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <Alert severity='error' onClose={() => setServerError(null)}>
            {serverError}
          </Alert>
        )}

        <Controller
          name='name'
          control={control}
          rules={buildValidationRules({required: true})}
          render={({field, fieldState}) => (
            <FlexxTextField
              {...field}
              label='Account Name'
              placeholder='Enter account name'
              required
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='bank_name'
          control={control}
          rules={buildValidationRules({required: true})}
          render={({field, fieldState}) => (
            <FlexxTextField
              {...field}
              label='Bank Name'
              placeholder='Enter bank name'
              required
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='routing_number'
          control={control}
          rules={buildValidationRules({required: true})}
          render={({field, fieldState}) => (
            <FlexxTextField
              {...field}
              label='Routing Number'
              placeholder='Enter routing number'
              required
              fullWidth
              number
              routingNumber
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='account_number'
          control={control}
          rules={buildValidationRules({required: true})}
          render={({field, fieldState}) => (
            <FlexxTextField
              {...field}
              label='Account Number'
              placeholder='Enter account number'
              required
              fullWidth
              number
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={isLoading}
          sx={{mt: '0.5rem'}}
        >
          {isLoading ? 'Creating...' : 'Add Account'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateAccountForm;
