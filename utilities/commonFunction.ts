export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const hoursStr = hrs > 0 ? `${hrs.toString().padStart(2, "0")}:` : "";
  const minutesStr = mins.toString().padStart(2, "0");
  const secondsStr = secs.toString().padStart(2, "0");

  return `${hoursStr}${minutesStr}:${secondsStr}`;
}

export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString("en-US");
}
