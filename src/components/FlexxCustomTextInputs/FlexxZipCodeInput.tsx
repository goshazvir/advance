import React from 'react';
import {IMaskInput} from 'react-imask';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

const FlexxZipCodeInput = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask='0000000'
        inputRef={ref}
        onAccept={value => onChange({target: {name: props.name, value: value}})}
        overwrite
      />
    );
  },
);

export default FlexxZipCodeInput;
