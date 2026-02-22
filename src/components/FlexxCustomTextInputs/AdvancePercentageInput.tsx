import React from 'react';
import {IMaskInput} from 'react-imask';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

const AdvancePercentageInput = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
      <IMaskInput
        {...other}
        mask={Number}
        scale={2}
        radix='.'
        mapToRadix={['.']}
        max={99.99}
        inputRef={ref}
        onAccept={value => onChange({target: {name: props.name, value}})}
        overwrite
      />
    );
  },
);

export default AdvancePercentageInput;
