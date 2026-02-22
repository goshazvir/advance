import {PAYMENT_STATUS} from '../constants/paymentStatus';

export function getDueDate(
  paymentDue?: string | Date | null,
  highlightDays = 7,
) {
  if (!paymentDue) {
    return '';
  }

  const dueDate = new Date(paymentDue);
  if (isNaN(dueDate.getTime())) {
    return '';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) {
    return {
      diffDays,
      status: PAYMENT_STATUS.LATE,
    };
  } else if (diffDays === 0) {
    return {
      diffDays,
      status: PAYMENT_STATUS.TODAY,
    };
  } else if (diffDays <= highlightDays) {
    return {
      diffDays,
      status: PAYMENT_STATUS.WARNING,
    };
  } else {
    return null;
  }
}
