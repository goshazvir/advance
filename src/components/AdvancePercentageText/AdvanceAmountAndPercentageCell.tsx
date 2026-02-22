import React from 'react';

import {Box} from '@mui/material';
import AdvanceCurrencyText from '@/components/AdvanceCurrencyText/AdvanceCurrencyText';
import AdvanceTrendIndicator from '@/components/AdvancePercentageText/AdvanceTrendIndicator';

const AdvanceAmountAndPercentageCell: React.FC<{
  amount?: number;
  percentage?: number;
  tooltip?: string;
}> = ({amount, percentage, tooltip}) => {
  return (
    <Box display={'flex'} gap={4} width={'fit-content'} justifySelf={'end'}>
      <AdvanceCurrencyText amount={amount} />
      <AdvanceTrendIndicator percentage={percentage} tooltip={tooltip} />
    </Box>
  );
};
export default AdvanceAmountAndPercentageCell;
