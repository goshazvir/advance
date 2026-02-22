import {RegisterOptions} from 'react-hook-form';

import {MAX_NAME_LENGTH} from '@/constants/fieldValidation';
import {
  FlexxTextFieldProps,
  Validator,
  ValidatorId,
} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const accountNumberRegex = /^(0[1-3]|1[0-2])\d{6}\d{1}$/;

const isValidTextField = ({
  value,
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
}: Partial<FlexxTextFieldProps>): {isValid?: boolean; message: string} => {
  const stringValue = value?.toString();
  if (required && !FlexxTextFieldValidators.required.callback(stringValue)) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.required.errorMessage,
    };
  } else if (
    accountName &&
    !FlexxTextFieldValidators.accountName.callback(stringValue)
  ) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.accountName.errorMessage,
    };
  } else if (email && !FlexxTextFieldValidators.email.callback(stringValue)) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.email.errorMessage,
    };
  } else if (phone && !FlexxTextFieldValidators.phone.callback(stringValue)) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.phone.errorMessage,
    };
  } else if (
    zipCode &&
    !FlexxTextFieldValidators.zipCode.callback(stringValue)
  ) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.zipCode.errorMessage,
    };
  } else if (
    routingNumber &&
    !FlexxTextFieldValidators.accountNumber.callback(stringValue)
  ) {
    return {
      isValid: false,
      message: FlexxTextFieldValidators.accountNumber.errorMessage,
    };
  } else if (minLength && stringValue && stringValue?.length < minLength) {
    return {
      isValid: false,
      message:
        customLengthError || `There must be at least ${minLength} characters.`,
    };
  } else if (maxLength && stringValue && stringValue?.length > maxLength) {
    return {
      isValid: false,
      message:
        customLengthError || `There must be at most ${maxLength} characters.`,
    };
  } else if (
    exactLength &&
    stringValue &&
    stringValue?.length !== exactLength
  ) {
    return {
      isValid: false,
      message:
        customLengthError || `There must be exactly ${exactLength} characters.`,
    };
  }
  return {isValid: true, message: ''};
};

const isRequired = (valueString?: string) =>
  !!valueString && valueString.trim().length > 0;
const isValidAccountNameLength = (valueString?: string) =>
  valueString
    ? valueString.length > 0 && valueString?.length <= MAX_NAME_LENGTH
    : true;
const isValidEmail = (valueString?: string) =>
  valueString ? emailRegex.test(valueString) : true;
const isValidPhone = (valueString?: string) =>
  valueString ? phoneRegex.test(valueString) : true;
const isValidZipCode = (valueString?: string) =>
  valueString ? valueString.length >= 5 && valueString?.length <= 7 : true;
const isValidAccountNumber = (valueString?: string) =>
  valueString ? accountNumberRegex.test(valueString) : true;

const FlexxTextFieldValidators: Record<ValidatorId, Validator> = {
  required: {
    callback: isRequired,
    errorMessage: 'This field is required.',
  },
  accountName: {
    callback: isValidAccountNameLength,
    errorMessage: `This field must be less than ${MAX_NAME_LENGTH} characters.`,
  },
  email: {
    callback: isValidEmail,
    errorMessage: 'Invalid email address.',
  },
  phone: {
    callback: isValidPhone,
    errorMessage: 'Invalid phone number.',
  },
  zipCode: {
    callback: isValidZipCode,
    errorMessage: 'Zip Code needs to be between 5 to 7 digits.',
  },
  accountNumber: {
    callback: isValidAccountNumber,
    errorMessage: 'The account number is invalid.',
  },
};

const buildValidationRules = (
  props: Partial<FlexxTextFieldProps>,
): RegisterOptions => {
  const {
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
  } = props;

  const validate: Record<string, (val: string) => true | string> = {};

  if (accountName) {
    validate.accountName = val =>
      FlexxTextFieldValidators.accountName.callback(val) ||
      FlexxTextFieldValidators.accountName.errorMessage;
  }

  if (email) {
    validate.email = val =>
      FlexxTextFieldValidators.email.callback(val) ||
      FlexxTextFieldValidators.email.errorMessage;
  }

  if (phone) {
    validate.phone = val =>
      FlexxTextFieldValidators.phone.callback(val) ||
      FlexxTextFieldValidators.phone.errorMessage;
  }

  if (zipCode) {
    validate.zipCode = val =>
      FlexxTextFieldValidators.zipCode.callback(val) ||
      FlexxTextFieldValidators.zipCode.errorMessage;
  }

  if (routingNumber) {
    validate.routingNumber = val =>
      FlexxTextFieldValidators.accountNumber.callback(val) ||
      FlexxTextFieldValidators.accountNumber.errorMessage;
  }

  if (exactLength) {
    validate.exactLength = val =>
      val?.length === exactLength ||
      customLengthError ||
      `There must be exactly ${exactLength} characters.`;
  }

  return {
    required: required ? FlexxTextFieldValidators.required.errorMessage : false,
    minLength: minLength
      ? {
          value: minLength,
          message:
            customLengthError ||
            `There must be at least ${minLength} characters.`,
        }
      : undefined,
    maxLength: maxLength
      ? {
          value: maxLength,
          message:
            customLengthError ||
            `There must be at most ${maxLength} characters.`,
        }
      : undefined,
    validate: Object.keys(validate).length > 0 ? validate : undefined,
  };
};

export {isValidEmail, isValidTextField, buildValidationRules};

export default FlexxTextFieldValidators;
