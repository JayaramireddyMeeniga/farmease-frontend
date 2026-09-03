import { FULL_DAY_HOURS } from "./workforceData";

export const formatCurrency = (amount) =>
  `Rs. ${Math.round(amount).toLocaleString("en-IN")}`;

export const formatHours = (hours) =>
  Number.isInteger(hours) ? `${hours}` : hours.toFixed(1);

export const getDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const getHoursBetween = (fromTime, toTime) => {
  if (!fromTime || !toTime) return 0;

  const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
  const [toHours, toMinutes] = toTime.split(":").map(Number);
  const fromTotalMinutes = fromHours * 60 + fromMinutes;
  const toTotalMinutes = toHours * 60 + toMinutes;
  const diffMinutes = toTotalMinutes - fromTotalMinutes;

  return diffMinutes > 0 ? diffMinutes / 60 : 0;
};

export const getBaseDailyCoolie = ({ marketPrice, cropConfig, taskConfig }) => {
  const price = Number(marketPrice) || 0;
  const marketBasedAmount =
    price * (cropConfig?.laborShare || 0.06) * taskConfig.multiplier;

  return Math.max(350, Math.round(marketBasedAmount / 10) * 10);
};

export const getHourlyCoolie = (baseDailyCoolie) =>
  Math.round(baseDailyCoolie / FULL_DAY_HOURS);
