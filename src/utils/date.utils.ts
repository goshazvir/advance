import {
  addDays as dateFnsAddDays,
  differenceInCalendarDays,
  subDays,
} from 'date-fns';

// Function to calculate a date 'days' from now
const addDays = ({
  days,
  date = new Date(),
}: {
  days: number;
  date?: Date;
}): Date => {
  return dateFnsAddDays(date, days);
};

const subtractDays = ({days, date}: {days: number; date?: Date}): Date => {
  return subDays(date || new Date(), days);
};

const calculateDaysBetweenDates = (date1: Date, date2: Date): number => {
  return differenceInCalendarDays(date1, date2);
};

const isWithinPastDays = ({
  date,
  days,
}: {
  date: Date;
  days: number;
}): boolean => {
  const today = new Date();
  const difference = differenceInCalendarDays(today, date);
  return difference >= 0 && difference <= days;
};

const dateTomorrow = addDays({days: 1});

const date30DaysFromNow = addDays({days: 30});

const date60DaysFromNow = addDays({days: 60});

const date90DaysFromNow = addDays({days: 90});

const nextDayOfMonthDate = (dayOfMonth = 1): Date => {
  const today = new Date();

  const nextDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);

  if (today.getDate() > dayOfMonth) {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }

  return nextDate;
};

const getReminderDate = (days: number, date: Date): Date => {
  const isBeforeDueDate = days < 0;
  const absoluteDays = Math.abs(days);

  return isBeforeDueDate
    ? subtractDays({days: absoluteDays, date})
    : addDays({days: absoluteDays, date});
};

const getReminderLabel = (days: number): string => {
  if (days === 0) return 'On due date';

  const absoluteDays = Math.abs(days);
  const dayText = absoluteDays === 1 ? 'day' : 'days';
  const timing = days < 0 ? 'before' : 'after';

  return `${absoluteDays} ${dayText} ${timing} due date`;
};

export {
  addDays,
  dateTomorrow,
  subtractDays,
  getReminderDate,
  isWithinPastDays,
  getReminderLabel,
  date30DaysFromNow,
  date60DaysFromNow,
  date90DaysFromNow,
  nextDayOfMonthDate,
  calculateDaysBetweenDates,
};
