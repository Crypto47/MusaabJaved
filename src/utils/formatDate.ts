export const pluralize = (count: number, unit: string, suffix = " ago") => {
  return `${count} ${unit}${count !== 1 ? "s" : ""}${suffix}`;
};

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));

  let formattedDate = "";

  if (daysAgo >= 365) {
    formattedDate = pluralize(Math.floor(daysAgo / 365), "year");
  } else if (daysAgo >= 30) {
    formattedDate = pluralize(Math.floor(daysAgo / 30), "month");
  } else if (daysAgo > 0) {
    formattedDate = pluralize(daysAgo, "day");
  } else if (hoursAgo > 0) {
    formattedDate = pluralize(hoursAgo, "hour");
  } else if (minutesAgo > 0) {
    formattedDate = pluralize(minutesAgo, "minute");
  } else {
    formattedDate = "just now";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (includeRelative) {
    return formattedDate;
  }

  return fullDate;
}
