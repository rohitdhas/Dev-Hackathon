export function getValue(name) {
  const val = localStorage.getItem(name);
  if (val) return JSON.parse(val);
  return undefined;
}

export function setValue(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}
