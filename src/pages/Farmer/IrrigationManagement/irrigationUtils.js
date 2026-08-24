export const getAreaValue = (area) => Number.parseFloat(area) || 0;

export const getIntervalDays = (schedule) => {
  const match = schedule.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
};

export const getScheduleTone = (schedule) => {
  const days = getIntervalDays(schedule);

  if (days <= 1) {
    return {
      label: "High priority",
      className: "bg-[#fff5da] text-[#8a5a00] ring-[#f4d27a]",
    };
  }

  if (days <= 3) {
    return {
      label: "Balanced",
      className: "bg-[#e7f7ef] text-[#1f7a50] ring-[#a7dcc1]",
    };
  }

  return {
    label: "Low demand",
    className: "bg-[#edf4ff] text-[#236299] ring-[#bdd8f2]",
  };
};
