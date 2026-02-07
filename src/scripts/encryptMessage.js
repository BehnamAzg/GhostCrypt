export const arrayToBase64 = function (arr) {
  return btoa(String.fromCharCode(...arr));
};

export const encryptMessage = async function (message, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]),
    { name: "AES-GCM", length: 256 },
    false, // Non-exportable for security
    ["encrypt", "decrypt"], // Allow decrypt with same key
  );
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(message));
  return {
    salt: arrayToBase64(salt),
    iv: arrayToBase64(iv),
    data: arrayToBase64(new Uint8Array(encrypted)),
  };
};
