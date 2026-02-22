import React, {forwardRef, useState} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlexxNumberInput from '@components/FlexxCustomTextInputs/FlexxNumberInput';
import FlexxZipCodeInput from '@components/FlexxCustomTextInputs/FlexxZipCodeInput';
import FlexxAutocomplete from '@components/FlexxCustomTextInputs/FlexxAutocomplete';
import FlexxPhoneNumberInput from '@components/FlexxCustomTextInputs/FlexxPhoneNumberInput';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import AdvancePercentageInput from '@components/FlexxCustomTextInputs/AdvancePercentageInput';
import {FlexxTextFieldProps} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';
import {isValidTextField} from '@components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators';
import FlexxFormattedNumberInput from '@components/FlexxCustomTextInputs/FlexxFormattedNumberInput';

const CharacterCount: React.FC<{length: number; limit: number}> = ({
  length,
  limit,
}) => {
  return (
    <Typography variant='subtitle2' fontSize={10}>
      {length}/{limit}
    </Typography>
  );
};

const FlexxTextField = forwardRef<HTMLInputElement, FlexxTextFieldProps>(
  (
    {
      testID,
      label,
      placeholder,
      name,
      value,
      onFocus,
      onChange,
      onKeyDown,
      select,
      defaultValue,
      options,
      enablePortal,
      optionsLoading,
      openOptions,
      closeOptions,
      onOptionChange,
      onInputChange,
      children,
      width,
      maxWidth,
      fullWidth,
      size = 'small',
      margin = 'normal',
      type,
      startAdornment,
      endAdornment,
      inputComponent,
      multiline,
      disabled,
      required,
      accountName,
      email,
      phone,
      formattedNumber,
      number,
      zipCode,
      currency,
      routingNumber,
      percentage,
      characterLimit = 50,
      minLength,
      maxLength,
      exactLength,
      customLengthError,
      showCharacterCount,
      isLoading,
      style,
      min,
      max,
      disableClearable,
      variant = 'outlined',
      externalError,
      externalHelperText,
      inputProps,
    },
    ref,
  ) => {
    const [error, setError] = useState<string | null | undefined>(
      externalError ? externalHelperText : null,
    );

    const getEffectiveCharacterLimit = () => {
      if (phone) return undefined;
      if (zipCode) return 7;
      if (percentage) return 5;
      if (routingNumber) return 9;
      if (multiline) return 256;

      return characterLimit;
    };

    const effectiveCharacterLimit = getEffectiveCharacterLimit();

    // Determine the appropriate input type for mobile keyboards
    const getInputType = () => {
      if (email) return 'email';
      if (type) return type;
      return 'text';
    };

    const inputType = getInputType();

    // Prevent mobile zoom on focus by ensuring font size is at least 16px
    const preventMobileZoomStyles = {
      fontSize: '16px',
      ...style,
    };

    if (phone) {
      inputComponent = FlexxPhoneNumberInput;
    }

    if (currency) {
      inputComponent = FlexxFormattedNumberInput;
      startAdornment = <InputAdornment position={'start'}>$</InputAdornment>;
    }

    if (formattedNumber) {
      inputComponent = FlexxFormattedNumberInput;
    }

    if (number) {
      inputComponent = FlexxNumberInput;
    }

    if (zipCode) {
      inputComponent = FlexxZipCodeInput;
    }

    if (percentage) {
      inputComponent = AdvancePercentageInput;
      endAdornment = <InputAdornment position={'end'}>%</InputAdornment>;
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Select all text on focus
      e.target.select();

      // Call the original onFocus if provided
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const {isValid, message} = isValidTextField({
        value: e.target.value,
        accountName,
        email,
        phone,
        required,
        zipCode,
        minLength,
        maxLength,
        exactLength,
        customLengthError,
        routingNumber,
      });
      if (isValid !== true) {
        setError(message);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        effectiveCharacterLimit &&
        e.target.value.length > effectiveCharacterLimit
      ) {
        return;
      }

      // For non-formatted inputs, handle max/min constraints
      // Formatted inputs (currency, formattedNumber) handle this internally via isAllowed
      if (!currency && !formattedNumber) {
        if (max !== undefined && e.target.value !== '') {
          const numValue = Number(e.target.value);
          if (!isNaN(numValue) && numValue > max) {
            e.target.value = String(max);
          }
        }

        if (min !== undefined && e.target.value !== '') {
          const numValue = Number(e.target.value);
          if (!isNaN(numValue) && numValue < min) {
            e.target.value = String(min);
          }
        }
      }

      if (onChange) {
        onChange(e);
      }
      if (error && !externalError) {
        setError(null);
      }
    };

    const renderSelectOption = (value: unknown) => {
      if (!value) {
        return <>{placeholder}</>;
      }
      return <>{value as React.ReactNode}</>;
    };

    const formattedLabel = required ? `${label} *` : label;
    const isAutocomplete = select && options;
    const skeletonWidth = width || maxWidth || (fullWidth ? '100%' : 300);

    const readOnlyStyles = {
      '& .MuiOutlinedInput-root': {
        '& input': {
          caretColor: 'transparent',
        },
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23) !important',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23) !important',
          borderWidth: '1px !important',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23) !important',
        },
      },
    };

    const shouldShowCharacterCount =
      showCharacterCount &&
      effectiveCharacterLimit &&
      !select &&
      !phone &&
      !zipCode &&
      !percentage;

    return (
      <FormControl
        data-testid={`${testID}.form-control`}
        fullWidth={fullWidth}
        style={{maxWidth: maxWidth, width: width}}
        variant='standard'
      >
        {label && <InputLabel shrink>{formattedLabel}</InputLabel>}
        {isAutocomplete ? (
          <FlexxAutocomplete
            data-testid={`${testID}.autocomplete`}
            ref={ref}
            type={type}
            label={label}
            error={error || (externalError ? externalHelperText : null)}
            margin={margin}
            disabled={disabled}
            select={select}
            size={size}
            placeholder={placeholder}
            name={name}
            value={value}
            onInputChange={onInputChange}
            onOptionChange={onOptionChange}
            closeOptions={closeOptions}
            openOptions={openOptions}
            options={options}
            optionsLoading={optionsLoading}
            enablePortal={enablePortal}
            style={style}
            disableClearable={disableClearable}
            variant={variant}
          />
        ) : (
          <TextField
            data-testid={`${testID}.text-field`}
            select={select}
            size={size}
            placeholder={placeholder}
            name={name}
            value={value ?? ''}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            fullWidth
            margin={margin}
            inputRef={ref}
            type={inputType}
            inputProps={{
              'data-testid': `${testID}`,
              min: min,
              max: max,
              maxLength: effectiveCharacterLimit,
              ...inputProps,
            }}
            InputProps={{
              startAdornment,
              endAdornment,
              inputComponent,
              style: preventMobileZoomStyles,
              inputProps: {
                'data-testid': `${testID}.input`,
                min,
                max,
                minLength,
                maxLength,
                value,
                ...inputProps,
              },
            }}
            multiline={multiline}
            rows={multiline ? 4 : 1}
            disabled={disabled}
            error={!!error || !!externalError}
            helperText={error || externalHelperText}
            SelectProps={{
              displayEmpty: true,
              renderValue: renderSelectOption,
              endAdornment: endAdornment,
              size: 'small',
            }}
            variant={variant}
            sx={inputProps?.readOnly ? readOnlyStyles : {}}
          >
            {select && !isAutocomplete ? children : null}
          </TextField>
        )}
        {shouldShowCharacterCount && (
          <Box
            display='flex'
            justifyContent='flex-end'
            marginRight={2}
            marginTop={-8}
            paddingBottom={4}
          >
            <CharacterCount
              data-testid={`${testID}.character-count`}
              length={value?.toString()?.length || 0}
              limit={effectiveCharacterLimit}
            />
          </Box>
        )}
      </FormControl>
    );
  },
);

export default FlexxTextField;
