import React, {forwardRef, useState} from 'react';

import FlexxIcon from '@components/FlexxIcon/FlexxIcon';
import {isValidTextField} from '@components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators';
import {
  FlexxAutocompleteProps,
  SelectOption,
} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';
import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

const FlexxAutocomplete = forwardRef<HTMLInputElement, FlexxAutocompleteProps>(
  (
    {
      name,
      type,
      size,
      value,
      margin,
      options,
      disabled,
      placeholder,
      optionsLoading,
      enablePortal,
      openOptions,
      closeOptions,
      onOptionChange,
      onInputChange,
      required,
      disableClearable,
      variant,
    },
    ref,
  ) => {
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleBlur = () => {
      const {isValid, message} = isValidTextField({
        value: options?.find(option => option.value === value)?.value ?? '',
        required,
      });

      setError(isValid ? null : message);
    };

    const handleOpen = () => {
      openOptions?.();
      setOpen(true);
    };

    const handleClose = () => {
      closeOptions?.();
      setOpen(false);
    };

    const handleButtonClick =
      (onClick: (e: React.MouseEvent<HTMLLIElement>) => void) =>
      (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        onClick(e);
        handleClose();
      };
    const handleDisabledClick = (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
    };

    return (
      <Autocomplete
        id={name}
        open={open}
        disabled={disabled}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={onOptionChange}
        onInputChange={onInputChange}
        onBlur={handleBlur}
        loading={optionsLoading}
        options={options ?? []}
        selectOnFocus
        clearOnBlur
        disablePortal={!enablePortal}
        clearOnEscape
        disableClearable={disableClearable}
        value={options?.find(option => option.value === value) ?? null}
        isOptionEqualToValue={(option: SelectOption, value: SelectOption) =>
          option?.value !== undefined
            ? option.value === value.value
            : option.label === value.label
        }
        getOptionLabel={(option: SelectOption) =>
          option.label ? option.label : option.value?.toString() || ''
        }
        getOptionKey={(option: SelectOption) =>
          option.id?.toString() || option.value?.toString()
        }
        renderOption={(props, option: SelectOption) => {
          if (option.onClick) {
            const {onClick} = option;
            return (
              <li
                {...props}
                key={option.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={
                  option.disabled
                    ? handleDisabledClick
                    : handleButtonClick(onClick)
                }
              >
                <Tooltip title={option.tooltip} placement='top'>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    gap={'0.5rem'}
                    sx={{cursor: 'pointer', width: '100%'}}
                  >
                    {option.icon && (
                      <FlexxIcon
                        icon={option.icon}
                        width={16}
                        height={16}
                        color={
                          option.disabled
                            ? theme.palette.text.disabled
                            : undefined
                        }
                      />
                    )}
                    <Typography
                      variant='body1'
                      color={
                        option.disabled
                          ? theme.palette.text.disabled
                          : undefined
                      }
                    >
                      {option.buttonLabel ? option.buttonLabel : option.label}
                    </Typography>
                  </Stack>
                </Tooltip>
              </li>
            );
          }
          return (
            <li
              {...props}
              {...(option.disabled && {onClick: handleDisabledClick})}
              key={option.id}
            >
              <Tooltip title={option.tooltip} placement='top'>
                <Typography
                  width={'100%'}
                  height={'100%'}
                  color={
                    option.disabled ? theme.palette.text.disabled : undefined
                  }
                >
                  {option.label}
                </Typography>
              </Tooltip>
            </li>
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder}
            size={size}
            margin={margin}
            type={type}
            inputRef={ref}
            error={!!error}
            helperText={error}
            variant={variant}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {optionsLoading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  },
);
export default FlexxAutocomplete;
