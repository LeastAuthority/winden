export function durationToClosestUnit(seconds: number): string {
  let minString = "";
  const secString = `${seconds % 60} sec. remaining`;
  if (seconds > 60) {
    minString = `${Math.round(seconds / 60)} min. remaining`;
    return minString;
  }
  return secString;
}
