export const normalizeTime = (time) => {
  if (!time) return "";

  if (Array.isArray(time)) {
    const [h, m] = time;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  return time;
};

export const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "N/A";

  const str = String(timeStr).trim();
  const isPM = /[pP][mM]/.test(str);
  const isAM = /[aA][mM]/.test(str);
  const parts = str.split(":");

  let hour = parseInt(parts[0], 10);
  const minute = (parts[1] || "00").replace(/[^0-9]/g, "").padStart(2, "0");

  const ampm = isPM ? "PM" : isAM ? "AM" : hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minute}${ampm}`;
};

export const formatDate = (date) => {
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
