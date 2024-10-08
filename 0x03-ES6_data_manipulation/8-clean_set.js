export default function cleanSet(set, startString) {
  let res = '';
  if (!startString || typeof startString !== 'string') return res;
  for (const str of set) {
    if (str && str.startsWith(startString)) {
      res += `${str.slice(startString.length)}-`;
    }
  }
  return res.slice(0, -1);
}
