export const PAYMENT_STATUS = {
  LATE: 'late',
  TODAY: 'today',
  WARNING: 'warning',
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
