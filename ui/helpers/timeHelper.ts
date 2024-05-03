import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";

dayjs.extend(dayjsPluginUTC);

export const getTimeFromMillisecondsDynamic = (millis, fullMeasureNames) => {
  console.log(millis);
  console.log(fullMeasureNames);

  const SECONDSMS = 1000;
  const MINUTESMS = SECONDSMS * 60;
  const HOURSMS = MINUTESMS * 60;
  const DAYMS = HOURSMS * 24;
  const YEARMS = DAYMS * 365;

  const yearsSymbol = fullMeasureNames ? "year" : "y";
  const daysSymbol = fullMeasureNames ? "day" : "d";
  const hoursSymbol = fullMeasureNames ? "hour" : "h";
  const minutesSymbol = fullMeasureNames ? "minute" : "m";
  const secondsSymbol = fullMeasureNames ? "second" : "s";
  const ago = "";

  let years, days, hours, minutes, seconds;

  years = Math.floor(millis / YEARMS);
  days = Math.floor(millis / DAYMS);
  hours = Math.floor(millis / HOURSMS);
  minutes = Math.floor(millis / MINUTESMS);
  seconds = Math.floor(millis / SECONDSMS);

  if (years >= 1) return years + yearsSymbol + ago;

  if (days >= 1) return days + daysSymbol + ago;

  if (hours >= 1) {
    let minutesLeft = minutes - hours * 60;
    return (
      hours +
      hoursSymbol +
      " " +
      (minutesLeft < 1 ? "" : minutesLeft + minutesSymbol) +
      ago
    );
  }

  if (minutes >= 1) {
    let secondsLeft = seconds - minutes * 60;
    return (
      minutes +
      minutesSymbol +
      " " +
      (secondsLeft < 1 ? "" : secondsLeft + secondsSymbol) +
      ago
    );
  }

  if (seconds >= 1) return seconds + secondsSymbol + ago;

  return "now";
};

export const getTimeFromMilliseconds = (millis) => {
  let timestamp = millis;
  let ago = "";

  if (!timestamp) return;

  if (timestamp < 0) {
    timestamp = Math.abs(millis);
    ago = " ago";
  }

  let days, hours, minutes;

  days = Math.floor(timestamp / 86400000);
  if (days >= 1) return days + " days" + ago;

  hours = Math.floor(timestamp / 1000 / 60 / 60);
  if (!Number.isInteger(hours)) {
    minutes = Math.floor((timestamp - hours * 60 * 60 * 1000) / 1000 / 60);
    if (hours >= 1) return hours + "h " + minutes + "m" + ago;
  }
  if (hours >= 1) return hours + "h" + ago;

  minutes = Math.floor(timestamp / 1000 / 60);
  if (minutes >= 1) return minutes + "m" + ago;

  return "< " + Math.ceil(minutes) + "m" + ago;
};

export const dateTimeFromTimestamp = (timestamp) => {
  const date = dayjs(new Date(timestamp)).format("DD.MM.YYYY HH:mm");
  return date;
};

// April 25, 2025 11:52 AM UTC
export const monthDayYearTimeFormat = (timestamp) => {
  if (!timestamp) return;
  const date = dayjs(new Date(timestamp)).format("MMMM D, YYYY h:mm A UTC");
  return date;
};

// 01.05.2021 UTC 11:34
export const dayMonthYearTimeFormat = (timestamp) => {
  if (!timestamp) return;
  const date = dayjs(new Date(timestamp)).format("DD.MM.YYYY UTC h:mm");
  return date;
};

export const getTimeDifference = (timelocalstorage: number): string => {
  const currentTime = Date.now();
  const timeDifference = timelocalstorage + 30 * 60000 - currentTime;

  if (timeDifference > 0) {
    const minutes = Math.floor(timeDifference / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  } else {
    return;
  }
};
