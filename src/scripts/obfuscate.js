const englishWords = ['the', 'and', 'to', 'of', 'a'];
const persianWords = ['و', 'به', 'از', 'در', 'که'];

// Helpers for grammar (stub; improve with NLP logic or libraries like compromise.js)
function capitalizeAndPunctuate(text) {
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}

function addPersianGrammar(text) {
  return text;  // Add Persian-specific rules, e.g., suffixes
}

export const obfuscate =  function (text, type) {
  const binary = new TextEncoder().encode(text);  // To bytes
  let result = '';
  
  switch (type) {
    case 'compact':
      return arrayToBase64(binary);  // Base64 for compactness
    case 'numbers':
      return Array.from(binary).map(b => b.toString(10).padStart(3, '0')).join('');  // 000-255 as digits
    case 'emojis':
      const emojiMap = ['😀', '😁', '😂'];
      return Array.from(binary).map(b => emojiMap[b]).join('');
    case 'characters':
      return Array.from(binary).map(b => String.fromCharCode(b + 65)).join('');  // Shift to A-Z range, adjust
    case 'dots':
      return Array.from(binary).map(b => b.toString(2).padStart(8, '0').replace(/0/g, '.').replace(/1/g, '•')).join(' ');  // Binary as dots
    case 'hybrid-english':
      // Simple: Encode 8 bits per word (256 words needed)
      if (englishWords.length < 256) throw new Error('Word list too small');
      binary.forEach(b => result += englishWords[b] + ' ');
      result = capitalizeAndPunctuate(result);  // Add grammar
      return result.trim();
    case 'hybrid-persian':
      // Similar, with Persian RTL and grammar
      if (persianWords.length < 256) throw new Error('Word list too small');
      binary.forEach(b => result += persianWords[b] + ' ');
      return addPersianGrammar(result).trim();
    default:
      return text;  // Fallback
  }
}


/*
Improvements needed:
For compact: Add compression before base64. Include pako.js (<script src="https://unpkg.com/pako@2.1.0/dist/pako.min.js"></script>) and use pako.deflate(binary, { to: 'string' }) then base64.
Hybrid: Expand word lists (fetch from APIs or hardcode). Add real grammar: subjects/verbs/objects. For English, randomly insert articles/prepositions while encoding bits in choices. This could make output longer, so watch SMS limit.
Emojis: Need exactly 256 unique; some browsers limit emoji support.
Test for round-trip: obfuscate -> deobfuscate should return original.
For large messages, compact mode helps, but encryption adds overhead (~33% for base64), so input limit <120 chars typically.

Libraries: For better hybrid, add a JS NLP lib. For compression, pako as mentioned.

*/