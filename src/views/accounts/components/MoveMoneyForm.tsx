'use client';

import type {Account} from '@/domain/Account';
import type {MoveMoneyPayload} from '@/domain/MoveMoneyPayload';
import type {MoveMoneyFormValues} from '@views/accounts/domain/MoveMoneyForm.types';
import type {SelectOption} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';

import React, {useEffect, useMemo, useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';

import {AccountStatus} from '@/domain/Account';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import useMoveMoneyMutation from '@views/accounts/hooks/useMoveMoneyMutation';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import {moveMoneyFormDefaults} from '@views/accounts/domain/MoveMoneyForm.types';
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

interface MoveMoneyFormProps {
  isOpen?: boolean;
  onSuccess?: () => void;
  prefilledSourceAccount?: Account | null;
}

const formatAccountLabel = (account: Account): string => {
  const masked = `**${account.account_number.slice(-4)}`;
  return `${account.name} - ${account.bank_name} ${masked}`;
};

const MoveMoneyForm: React.FC<MoveMoneyFormProps> = ({
  isOpen,
  onSuccess,
  prefilledSourceAccount,
}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {data: accounts} = useFetchAccounts({});

  const {control, handleSubmit, reset, setValue} = useForm<MoveMoneyFormValues>(
    {
      defaultValues: prefilledSourceAccount
        ? {
            ...moveMoneyFormDefaults,
            source_account_id: prefilledSourceAccount.account_id,
          }
        : moveMoneyFormDefaults,
      mode: 'onChange',
    },
  );

  const watchedSourceId = useWatch({control, name: 'source_account_id'});
  const watchedDestId = useWatch({control, name: 'destination_account_id'});
  const watchedAmount = useWatch({control, name: 'amount'});
  const watchedConfirmed = useWatch({control, name: 'confirmed'});

  const {mutate, isLoading} = useMoveMoneyMutation({
    onSuccess: () => {
      setServerError(null);
      onSuccess?.();
    },
    onError: error => {
      setServerError(error.message || 'Transfer failed. Please try again.');
    },
  });

  useEffect(() => {
    if (isOpen) {
      const defaults = prefilledSourceAccount
        ? {
            ...moveMoneyFormDefaults,
            source_account_id: prefilledSourceAccount.account_id,
          }
        : moveMoneyFormDefaults;
      reset(defaults);
      setServerError(null);
    }
  }, [isOpen, reset, prefilledSourceAccount]);

  const openAccounts = useMemo(
    () =>
      (accounts ?? []).filter(account => account.status === AccountStatus.OPEN),
    [accounts],
  );

  const sourceOptions: SelectOption[] = useMemo(
    () =>
      openAccounts.map(account => ({
        id: account.account_id,
        value: account.account_id,
        label: formatAccountLabel(account),
      })),
    [openAccounts],
  );

  const destinationOptions: SelectOption[] = useMemo(
    () =>
      openAccounts
        .filter(account => account.account_id !== watchedSourceId)
        .map(account => ({
          id: account.account_id,
          value: account.account_id,
          label: formatAccountLabel(account),
        })),
    [openAccounts, watchedSourceId],
  );

  // Reset destination if it matches the newly selected source
  useEffect(() => {
    if (watchedSourceId && watchedDestId === watchedSourceId) {
      setValue('destination_account_id', '');
    }
  }, [watchedSourceId, watchedDestId, setValue]);

  const selectedSourceAccount = useMemo(
    () => openAccounts.find(a => a.account_id === watchedSourceId),
    [openAccounts, watchedSourceId],
  );

  const isFormComplete =
    !!watchedSourceId &&
    !!watchedDestId &&
    !!watchedAmount &&
    parseFloat(watchedAmount.replace(/,/g, '')) > 0 &&
    watchedConfirmed;

  const onSubmit = (formValues: MoveMoneyFormValues) => {
    setServerError(null);
    const amount = parseFloat(formValues.amount.replace(/,/g, ''));

    if (selectedSourceAccount && amount > selectedSourceAccount.balance) {
      setServerError('Amount exceeds available balance');
      return;
    }

    const payload: MoveMoneyPayload = {
      source_account_id: prefilledSourceAccount
        ? prefilledSourceAccount.account_id
        : formValues.source_account_id,
      destination_account_id: formValues.destination_account_id,
      amount,
      merchant: 'Internal Transfer',
    };
    mutate(payload);
  };

  return (
    <Stack gap={'1.5rem'}>
      <Typography variant='h5' sx={{fontWeight: 600}}>
        Move Money
      </Typography>

      <Stack component='form' gap={'1.25rem'} onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <Alert severity='error' onClose={() => setServerError(null)}>
            {serverError}
          </Alert>
        )}

        {prefilledSourceAccount ? (
          <Stack spacing={0.5}>
            <Typography variant='caption' color='text.secondary'>
              Source Account *
            </Typography>
            <Typography variant='body1'>
              {prefilledSourceAccount.name} &middot;{' '}
              {prefilledSourceAccount.bank_name}
            </Typography>
          </Stack>
        ) : (
          <Controller
            name='source_account_id'
            control={control}
            rules={{required: 'Source account is required'}}
            render={({field, fieldState}) => (
              <FlexxTextField
                name={field.name}
                value={field.value}
                label='Source Account'
                placeholder='Select source account'
                select
                options={sourceOptions}
                onOptionChange={(_event, option) => {
                  field.onChange(option?.value ?? '');
                }}
                required
                fullWidth
                externalError={!!fieldState.error}
                externalHelperText={fieldState.error?.message}
              />
            )}
          />
        )}

        <Controller
          name='destination_account_id'
          control={control}
          rules={{required: 'Destination account is required'}}
          render={({field, fieldState}) => (
            <FlexxTextField
              name={field.name}
              value={field.value}
              label='Destination Account'
              placeholder='Select destination account'
              select
              options={destinationOptions}
              onOptionChange={(_event, option) => {
                field.onChange(option?.value ?? '');
              }}
              required
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='amount'
          control={control}
          rules={{
            required: 'Amount is required',
            validate: {
              positive: (val: string) => {
                const num = parseFloat(val.replace(/,/g, ''));
                if (isNaN(num) || num <= 0) {
                  return 'Amount must be greater than zero';
                }
                return true;
              },
              withinBalance: (val: string) => {
                if (!selectedSourceAccount) return true;
                const num = parseFloat(val.replace(/,/g, ''));
                if (isNaN(num)) return true;
                if (num > selectedSourceAccount.balance) {
                  return 'Amount exceeds available balance';
                }
                return true;
              },
            },
          }}
          render={({field, fieldState}) => (
            <FlexxTextField
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label='Amount'
              placeholder='Enter amount'
              currency
              required
              fullWidth
              externalError={!!fieldState.error}
              externalHelperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name='confirmed'
          control={control}
          render={({field}) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                />
              }
              label='I confirm this transfer'
            />
          )}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={!isFormComplete || isLoading}
          sx={{mt: '0.5rem'}}
        >
          {isLoading ? 'Transferring...' : 'Move Money'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default MoveMoneyForm;
