import { getEnWords, getFaWords, getEmojisWords } from "./wordList.js";
import { arrayToBase64 } from "./encryptMessage.js";
import { base65536Encode } from "./base65536.js";

export const obfuscate = async function (text, type) {
  const binary = new TextEncoder().encode(text); // To bytes
  let result = "";

  switch (type) {
    case "base64":
      return arrayToBase64(binary);
    case "base65536":
      return base65536Encode(binary);
    case "numbers":
      return Array.from(binary)
        .map((b) => b.toString(10).padStart(3, "0"))
        .join(""); // 000-255 as digits
    case "emojis":
      const emojiMap = await getEmojisWords();
      return [...binary].map((b) => emojiMap[b]).join("");
    case "characters":
      return Array.from(binary)
        .map((b) => String.fromCharCode(b + 65))
        .join(""); // Shift to A-Z range, adjust
    case "dots":
      return Array.from(binary)
        .map((b) => b.toString(2).padStart(8, "0").replace(/0/g, ".").replace(/1/g, ":"))
        .join(" "); // Binary as dots
    case "hybrid-english": {
      const words = await getEnWords();
      let resultWords = Array.from(binary).map((b) => words[b]);
      result = resultWords.join(" ");
      return result.trim();
    }
    case "hybrid-persian": {
      const words = await getFaWords();
      let resultWords = Array.from(binary).map((b) => words[b]);
      result = resultWords.join(" ");
      return result.trim();
    }
    default:
      return text;
  }
};
