const englishWords = ['the', 'and', 'to', 'of', 'a'];
const persianWords = ['و', 'به', 'از', 'در', 'که'];

export const deobfuscate = function deobfuscate(text, type) {
  let binary = [];
  
  switch (type) {
    case 'compact':
      return new TextDecoder().decode(base64ToArray(text));
    case 'numbers':
      for (let i = 0; i < text.length; i += 3) {
        binary.push(parseInt(text.slice(i, i+3), 10));
      }
      break;
    case 'emojis':
      const emojiMap = ['😀', '😁', '😂'];
      text.split('').forEach(e => binary.push(emojiMap.indexOf(e)));
      break;
    case 'characters':
      text.split('').forEach(c => binary.push(c.charCodeAt(0) - 65));
      break;
    case 'dots':
      text.split(' ').forEach(d => {
        const binStr = d.replace(/\./g, '0').replace(/•/g, '1');
        binary.push(parseInt(binStr, 2));
      });
      break;
    case 'hybrid-english':
    case 'hybrid-persian':
      const words = text.split(' ').map(w => w.toLowerCase().replace(/[.,!?]/g, ''));
      const wordList = type === 'hybrid-english' ? englishWords : persianWords;
      words.forEach(w => {
        const idx = wordList.indexOf(w);
        if (idx === -1) throw new Error('Invalid obfuscation data');
        binary.push(idx);
      });
      break;
    default:
      return text;
  }
  
  return new TextDecoder().decode(new Uint8Array(binary));
}