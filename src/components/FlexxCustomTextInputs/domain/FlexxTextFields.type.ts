import React, {SyntheticEvent} from 'react';

type Validator = {
  callback: (value?: string) => boolean;
  errorMessage: string;
};

interface SelectOption {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  tooltip?: string;
  buttonLabel?: string;
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  meta_data?: unknown;
}

type SelectOptionType = SelectOption | null;

interface ExtendedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  removeLeadingZeros?: boolean;
  allowNegative?: boolean;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

interface FlexxTextFieldProps {
  testID?: string;
  label?: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  select?: boolean;
  options?: SelectOption[];
  enablePortal?: boolean;
  optionsLoading?: boolean;
  openOptions?: (event?: SyntheticEvent<Element, Event>) => void;
  closeOptions?: (event?: SyntheticEvent<Element, Event>) => void;
  onInputChange?: (
    event?: SyntheticEvent<Element, Event>,
    value?: string,
  ) => void;
  onOptionChange?: (
    event: React.SyntheticEvent,
    value: SelectOption | null,
  ) => void;
  defaultValue?: string;
  children?: React.ReactNode;
  width?: number;
  maxWidth?: number;
  fullWidth?: boolean;
  autoFocus?: boolean;
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  accountName?: boolean;
  phone?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputComponent?: React.ComponentType<any>;
  multiline?: boolean;
  disabled?: boolean;
  email?: boolean;
  required?: boolean;
  validator?: Validator;
  formattedNumber?: boolean;
  number?: boolean;
  zipCode?: boolean;
  currency?: boolean;
  routingNumber?: boolean;
  percentage?: boolean;
  characterLimit?: number;
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
  customLengthError?: string;
  showCharacterCount?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties;
  min?: number;
  max?: number;
  disableClearable?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  externalError?: boolean;
  externalHelperText?: string;
  inputProps?: ExtendedInputProps;
}

interface FlexxAutocompleteProps extends FlexxTextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>;
  error: string | null | undefined;
  options?: SelectOption[];
}

enum ValidatorId {
  required = 'required',
  accountName = 'accountName',
  email = 'email',
  phone = 'phone',
  zipCode = 'zipCode',
  accountNumber = 'accountNumber',
}

export type {
  Validator,
  SelectOption,
  SelectOptionType,
  FlexxTextFieldProps,
  FlexxAutocompleteProps,
};
export {ValidatorId};
