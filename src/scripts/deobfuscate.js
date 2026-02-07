import { getEnWords, getFaWords, getEmojisWords } from "./wordList.js";
import { base64ToArray } from "./decryptMessage.js";
import { base65536Decode } from "./base65536.js";

export const deobfuscate = async function (text, type) {
  let binary = [];

  const englishWords = await getEnWords();
  const persianWords = await getFaWords();

  switch (type) {
    case "base64":
      return new TextDecoder().decode(base64ToArray(text));
    case "base65536":
      const binaryArray = base65536Decode(text);
      return new TextDecoder().decode(binaryArray);
    case "numbers":
      for (let i = 0; i < text.length; i += 3) {
        binary.push(parseInt(text.slice(i, i + 3), 10));
      }
      break;
    case "emojis":
      const emojiMap = await getEmojisWords();
      const emojis = [...text];
      emojis.forEach((e) => {
        const idx = emojiMap.indexOf(e);
        if (idx === -1) throw new Error(`Unknown emoji in message: ${e}`);
        binary.push(idx);
      });
      break;
    case "characters":
      text.split("").forEach((c) => binary.push(c.charCodeAt(0) - 65));
      break;
    case "dots":
      text.split(" ").forEach((d) => {
        const binStr = d.replace(/\./g, "0").replace(/:/g, "1");
        binary.push(parseInt(binStr, 2));
      });
      break;
    case "hybrid-english":
    case "hybrid-persian": {
      const wordList = type === "hybrid-english" ? englishWords : persianWords;

      const words = text.split(/\s+/).map((w) => w.replace(/[.,!?]/g, ""));
      for (const w of words) {
        const idx = wordList.indexOf(w);
        if (idx === -1) throw new Error(`Unknown word: ${w}`);
        binary.push(idx); // No %256 - idx will be 0-255 naturally
      }
      break;
    }
    default:
      return text;
  }

  return new TextDecoder().decode(new Uint8Array(binary));
};
