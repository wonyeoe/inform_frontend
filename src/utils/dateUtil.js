export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const formatMonthKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const isSameDate = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// 날짜만 비교 (시간 무시) - a가 b보다 이전인지
export const isDateBefore = (a, b) => {
  const aDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDate = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aDate < bDate;
};

// 날짜만 비교 (시간 무시) - a가 b보다 이후인지
export const isDateAfter = (a, b) => {
  const aDate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDate = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aDate > bDate;
};

// 날짜만 비교 (시간 무시) - a가 b 이상인지
export const isDateAfterOrEqual = (a, b) => {
  return !isDateBefore(a, b);
};

// 날짜만 비교 (시간 무시) - a가 b 이하인지
export const isDateBeforeOrEqual = (a, b) => {
  return !isDateAfter(a, b);
};
