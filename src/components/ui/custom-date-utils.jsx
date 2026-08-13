export function formatLocalTime() {
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const totalMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const sign = offsetMinutes <= 0 ? "+" : "-";

  return `GMT${sign}${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}`;
}

export function formatLocalTime1(dateString) {
  if (!dateString) return "";

  const formattedString = dateString.replace(" ", "T");
  const date = new Date(formattedString);

  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return `${days}d ago`;
}

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .formatToParts(new Date(date))
    .map((part) =>
      part.type === "dayPeriod" ? part.value.toUpperCase() : part.value,
    )
    .join("");
};
