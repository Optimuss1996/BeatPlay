export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `0${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
