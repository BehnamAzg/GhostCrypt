export const base64ToArray = function (base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

export const decryptMessage = async function (encryptedObj, password) {
  try {
    const salt = base64ToArray(encryptedObj.salt);
    const iv = base64ToArray(encryptedObj.iv);
    const data = base64ToArray(encryptedObj.data);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
      await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]),
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error("Decryption failed: Invalid passphrase or corrupted data.");
  }
};
