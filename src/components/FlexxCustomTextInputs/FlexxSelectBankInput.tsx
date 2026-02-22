import {forwardRef} from 'react';

import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import {FlexxTextFieldProps} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';

const FlexxSelectBankInput = forwardRef<HTMLInputElement, FlexxTextFieldProps>(
  (props, ref) => {
    return (
      <FlexxTextField
        ref={ref}
        {...props}
        label='Select Bank'
        placeholder='Select Bank'
        fullWidth
      />
    );
  },
);

export default FlexxSelectBankInput;
