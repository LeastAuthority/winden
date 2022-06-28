export function sizeToClosestUnit(bytes: number): string {
  const byteUnits = ["bytes", "kB", "MB", "GB", " TB", "PB", "EB", "ZB", "YB"];
  const unitIndex = Math.floor(Math.log10(bytes) / 3);
  return `${(bytes / 10 ** (unitIndex * 3)).toFixed(1)} ${
    byteUnits[unitIndex]
  }`;
}
