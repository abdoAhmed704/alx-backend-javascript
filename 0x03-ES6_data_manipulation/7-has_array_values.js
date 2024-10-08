export default function hasValuesFromArray(arr, values) {
  const s = new Set(arr);
  for (const value of values) {
    if (!s.has(value)) return false;
  }
  return true;
}
