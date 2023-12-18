export const localTimeFromSeconds = (seconds: number, day: string) => {
  const date = new Date(seconds * 1000);
  const daysAfter = date.getDate() - parseInt(day);
  return (daysAfter > 0 ? ` +${daysAfter}d:` : "") + date.toLocaleTimeString();
};

export const lengthInTimeFromSeconds = (timeInSeconds: number) => {
  const milliseocnds = timeInSeconds * 1000;
  const days = Math.floor(milliseocnds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseocnds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseocnds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseocnds % (1000 * 60)) / 1000);

  const daysString = days > 0 ? `${days}d ` : "";
  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutes > 0 ? `${minutes}m ` : "";
  const secondsString = seconds > 0 ? `${seconds}s ` : "";

  return `${daysString}${hoursString}${minutesString}${secondsString}`;
};
