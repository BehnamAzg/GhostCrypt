const ENCODE = new Array(65536);
const DECODE = new Map();

// Fill encode table (0x0000 → 0xFFFF → char)
for (let i = 0; i < 65536; i++) {
  const code = 0x3400 + i;
  const char = String.fromCharCode(code);
  ENCODE[i] = char;
  DECODE.set(char, i);
}

export function base65536Encode(bytes) {
  let result = '';
  let i = 0;
  while (i < bytes.length) {
    const a = bytes[i++];
    const b = i < bytes.length ? bytes[i++] : 0;
    const value = (a << 8) | b;
    result += ENCODE[value];
  }
  return result;
}

export function base65536Decode(str) {
  const bytes = [];
  for (const char of str) {
    const value = DECODE.get(char);
    if (value === undefined) {
      throw new Error(`Invalid Base65536 character: ${char}`);
    }
    bytes.push((value >> 8) & 0xFF);
    bytes.push(value & 0xFF);
  }
  if (bytes.length % 2 !== 0) {
    bytes.pop();
  }
  return new Uint8Array(bytes);
}