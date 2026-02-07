import effWords from '/src/scripts/data/eff-large-wordlist.json' assert { type: 'json' };
import enWords from '/src/scripts/data/en-frequent-wordlist.json' assert { type: 'json' };
import faWords from '/src/scripts/data/fa-frequent-wordlist.json' assert { type: 'json' };
import emojis from '/src/scripts/data/emojis.json' assert { type: 'json' };

export const getEffWords = async () => effWords;
export const getEnWords = async () => enWords;
export const getFaWords = async () => faWords;
export const getEmojisWords = async () => emojis;


// let effWordsCache;
// let enWordsCache;
// let faWordsCache;
// let EmojisListCache;

// export const getEffWords = async function () {
//   if (effWordsCache) return effWordsCache;
//   try {
//     const response = await fetch('/src/scripts/data/eff-large-wordlist.json');
//     if (!response.ok) {
//       throw new Error(`Failed to load word list: ${response.status}`);
//     }
//     effWordsCache = await response.json();
//     return effWordsCache;
//   } catch (err) {
//     console.error("Could not load EFF word list:", err);
//     return ["change", "this", "fallback", "passphrase", "please"];
//   }
// }

// export const getEnWords = async function () {
//   if (enWordsCache) return enWordsCache;
//   console.log("English words length:", enWordsCache.length);
//   try {
//     const response = await fetch('/src/scripts/data/en-frequent-wordlist.json');
//     if (!response.ok) {
//       throw new Error(`Failed to load word list: ${response.status}`);
//     }
//     enWordsCache = await response.json();
//     return enWordsCache;
//   } catch (err) {
//     console.error("Could not load English word list:", err);
//     return ["change", "this", "fallback", "words", "please"];
//   }
// }

// export const getFaWords = async function () {
//   if (faWordsCache) return faWordsCache;
//   console.log("Persian words length:", faWordsCache.length);
//   try {
//     const response = await fetch('/src/scripts/data/fa-frequent-wordlist.json');
//     if (!response.ok) {
//       throw new Error(`Failed to load word list: ${response.status}`);
//     }
//     faWordsCache = await response.json();
//     return faWordsCache;
//   } catch (err) {
//     console.error("Could not load Persian word list:", err);
//     return ["change", "this", "fallback", "words", "please"];
//   }
// }

// export const getEmojisWords = async function () {
//   if (EmojisListCache) return EmojisListCache;
//   console.log("Emojis length:", EmojisListCache.length);
//   try {
//     const response = await fetch('/src/scripts/data/emojis.json');
//     if (!response.ok) {
//       throw new Error(`Failed to load emoji list: ${response.status}`);
//     }
//     EmojisListCache = await response.json();
//     return EmojisListCache;
//   } catch (err) {
//     console.error("Could not load Emoji list:", err);
//     return ["😀", "😁", "😂", "🙂", "😐"];
//   }
// }



