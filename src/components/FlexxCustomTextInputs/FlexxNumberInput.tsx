import React from 'react';
import {IMaskInput} from 'react-imask';

// Define interface for the NumberMaskAdapter props
interface NumberMaskCustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  removeLeadingZeros?: boolean;
}

// Custom TextMaskAdapter component for IMask integration with MUI
const FlexxNumberInput = React.forwardRef<
  HTMLInputElement,
  NumberMaskCustomProps
>(function NumberMaskAdapter(props, ref) {
  const {onChange, min, max, maxLength, removeLeadingZeros, ...other} = props;

  const maskOptions = {
    mask: /^\d*$/, // Regex mask for digits only (allows leading zeros)
    definitions: {
      '#': /[0-9]/,
    },
    maxLength: maxLength,
  };

  const handleAccept = (value: string) => {
    let finalValue = value;

    // Remove leading zeros if requested
    if (removeLeadingZeros && finalValue) {
      // Remove leading zeros, but keep at least one digit
      finalValue = finalValue.replace(/^0+/, '') || '0';
    }

    // Apply min/max validation if provided
    if (finalValue && (min !== undefined || max !== undefined)) {
      const numValue = parseInt(finalValue, 10);

      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) {
          finalValue = min.toString();
        } else if (max !== undefined && numValue > max) {
          finalValue = max.toString();
        }
      }
    }

    onChange({target: {name: props.name, value: finalValue}});
  };

  return (
    <IMaskInput
      {...other}
      {...maskOptions}
      unmask={true}
      inputRef={ref}
      onAccept={handleAccept}
    />
  );
});

export default FlexxNumberInput;
