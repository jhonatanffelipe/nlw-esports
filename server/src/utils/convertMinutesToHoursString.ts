export default function convertMinutesToHoursString(minutes: number): String {
  const minutesString = minutes % 60;

  const hoursString = (minutes - minutesString) / 60;

  return `${String(hoursString).padStart(2, "0")}:${String(
    minutesString
  ).padStart(2, "0")}`;
}
