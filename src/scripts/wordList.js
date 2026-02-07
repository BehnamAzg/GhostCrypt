import effWords from '/src/scripts/data/eff-large-wordlist.json' assert { type: 'json' };
import enWords from '/src/scripts/data/en-frequent-wordlist.json' assert { type: 'json' };
import faWords from '/src/scripts/data/fa-frequent-wordlist.json' assert { type: 'json' };
import emojis from '/src/scripts/data/emojis.json' assert { type: 'json' };

export const getEffWords = async () => effWords;
export const getEnWords = async () => enWords;
export const getFaWords = async () => faWords;
export const getEmojisWords = async () => emojis;