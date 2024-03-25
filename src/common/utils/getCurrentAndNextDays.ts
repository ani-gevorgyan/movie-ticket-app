import { CurrentDayAndNextDay } from '../../screening/datatypes/internal/screening';

export function getCurrentAndNextDays(): CurrentDayAndNextDay {
  const currentDay = new Date();
  const nextDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);
  return { currentDay, nextDay };
}
