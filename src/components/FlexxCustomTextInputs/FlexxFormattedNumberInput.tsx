import React from 'react';
import {NumericFormat, NumericFormatProps} from 'react-number-format';

export interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  readOnly?: boolean;
  allowNegative?: boolean;
  min?: number;
  max?: number;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

const FlexxFormattedNumberInput = React.forwardRef<
  NumericFormatProps,
  CustomProps
>(function NumericFormatCustom(props, ref) {
  const {
    readOnly,
    allowNegative = false,
    onChange,
    min,
    max,
    fixedDecimalScale,
    decimalScale,
    ...other
  } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      readOnly={readOnly}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      decimalScale={decimalScale ?? 2}
      fixedDecimalScale={fixedDecimalScale ?? false}
      valueIsNumericString
      allowNegative={allowNegative}
      allowLeadingZeros={false}
      isAllowed={values => {
        const {floatValue} = values;
        if (floatValue === undefined) return true;
        if (min !== undefined && floatValue < min) return false;
        if (max !== undefined && floatValue > max) return false;
        return true;
      }}
    />
  );
});

export default FlexxFormattedNumberInput;
