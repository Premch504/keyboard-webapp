// Kedmanee Layout Map: EN key → Thai character (TIS 820-2531, macOS version)
const EN_TO_TH: Record<string, string> = {
  '`': '_', '1': 'ๅ', '2': '/', '3': '-', '4': 'ภ', '5': 'ถ',
  '6': 'ุ', '7': 'ึ', '8': 'ค', '9': 'ต', '0': 'จ', '-': 'ข', '=': 'ช',
  '~': '%', '!': '+', '@': '๑', '#': '๒', '$': '๓', '%': '๔', '^': 'ู',
  '&': '฿', '*': '๕', '(': '๖', ')': '๗', '_': '๘', '+': '๙',
  'q': 'ๆ', 'w': 'ไ', 'e': 'ำ', 'r': 'พ', 't': 'ะ', 'y': 'ั', 'u': 'ี',
  'i': 'ร', 'o': 'น', 'p': 'ย', '[': 'บ', ']': 'ล', '\\': 'ฃ',
  'Q': '๐', 'W': '"', 'E': 'ฎ', 'R': 'ฑ', 'T': 'ธ', 'Y': 'ํ', 'U': '๊',
  'I': 'ณ', 'O': 'ฯ', 'P': 'ญ', '{': 'ฐ', '}': ',', '|': '.',
  'a': 'ฟ', 's': 'ห', 'd': 'ก', 'f': 'ด', 'g': 'เ', 'h': '้', 'j': '่',
  'k': 'า', 'l': 'ส', ';': 'ว', "'": 'ง',
  'A': 'ฤ', 'S': 'ฆ', 'D': 'ฏ', 'F': 'โ', 'G': 'ฌ', 'H': '็', 'J': '๋',
  'K': 'ษ', 'L': 'ศ', ':': 'ซ', '"': 'ฺ',
  'z': 'ผ', 'x': 'ป', 'c': 'แ', 'v': 'อ', 'b': 'ิ', 'n': 'ื', 'm': 'ท',
  ',': 'ม', '.': 'ใ', '/': 'ฝ',
  'Z': 'ฉ', 'X': 'ฮ', 'V': 'ฒ', 'B': '?', 'N': '์', 'M': 'ฬ', '<': 'ฦ',
};

// Reverse map: Thai → EN key (first-seen-wins to fix collision bug)
const TH_TO_EN: Record<string, string> = {};
for (const [k, v] of Object.entries(EN_TO_TH)) {
  if (!(v in TH_TO_EN)) {
    TH_TO_EN[v] = k;
  }
}

// Real English words that should NOT be converted
const REAL_EN = new Set([
  "a", "i", "ok", "hi", "no", "go", "do", "up", "in", "on", "at", "by", "to", "or",
  "the", "and", "for", "but", "not", "you", "are", "was", "has", "had", "can",
  "will", "did", "get", "got", "let", "put", "set", "use", "see", "say", "he",
  "she", "we", "it", "me", "my", "his", "her", "its", "our", "them", "they",
  "who", "why", "how", "what", "when", "where", "which", "all", "any", "few",
  "more", "some", "into", "than", "then", "very", "just", "also", "back",
  "well", "even", "much", "too", "both", "each", "here", "there", "after",
  "before", "about", "over", "under", "same", "own", "off", "out", "world",
  "meeting", "hello", "bye", "yes", "lol", "omg", "wtf", "bro", "sis",
  "love", "like", "follow", "post", "share", "link", "id", "name", "call",
  "chat", "work", "home", "school", "food", "shop", "free", "new", "hot",
  "live", "online", "app", "web", "site", "page", "group", "team", "game",
  "project", "zoom", "email", "phone", "number", "pls", "msg", "tmr", "thx",
  "tbh", "ngl", "imo", "fyi", "asap", "etc", "vs", "ft", "america", "israel",
  "deploy", "server", "config", "crash", "code", "push", "fix", "bug",
  "test", "run", "build", "error", "log", "git", "dev", "claude", "python",
]);

// Real Thai words that wont be converted
const REAL_TH = new Set([
  // Pronouns & basic references
  "ผม", "ฉัน", "หนู", "เรา", "คุณ", "เขา", "เธอ", "มัน", "ท่าน", "พวกเขา",
  "ใคร", "อะไร", "ที่ไหน", "เมื่อไหร่", "ทำไม", "ยังไง", "อย่างไร",

  // Common verbs
  "ไป", "มา", "กิน", "นอน", "ดู", "ฟัง", "พูด", "บอก", "ถาม", "ตอบ",
  "ทำ", "ได้", "ให้", "รู้", "คิด", "รัก", "ชอบ", "ใช้", "เอา", "เป็น",
  "มี", "อยู่", "ต้อง", "อยาก", "จะ", "ช่วย", "เริ่ม", "หยุด", "ส่ง", "รับ",

  // Common nouns
  "บ้าน", "โรงเรียน", "ที่ทำงาน", "ร้าน", "ถนน", "รถ", "คน", "เพื่อน",
  "ครอบครัว", "พ่อ", "แม่", "พี่", "น้อง", "ลูก", "ของ", "งาน", "เงิน",
  "เวลา", "วัน", "คืน", "เช้า", "เย็น", "อาหาร", "น้ำ", "โทรศัพท์",

  // Common adjectives / adverbs
  "ดี", "ไม่ดี", "สวย", "หล่อ", "ใหม่", "เก่า", "เร็ว", "ช้า", "มาก", "น้อย",
  "ใหญ่", "เล็ก", "ร้อน", "เย็น", "แพง", "ถูก", "ง่าย", "ยาก", "ดีมาก",

  // Particles & connectors (very common in Thai sentences)
  "ครับ", "ค่ะ", "คะ", "นะ", "นะครับ", "นะคะ", "ด้วย", "แล้ว", "ก็", "แต่",
  "และ", "หรือ", "เพราะ", "ถ้า", "เมื่อ", "ตอน", "กับ", "จาก", "ใน", "ที่",
  "ของ", "โดย", "ว่า", "อีก", "แค่", "เลย", "ก่อน", "หลัง", "ระหว่าง",

  // Negation & question
  "ไม่", "ไม่ได้", "ไม่มี", "ไม่ใช่", "ใช่ไหม", "ได้ไหม", "มีไหม", "ไหม",
  "เปล่า", "ไม่เป็นไร",

  // Greetings & social
  "สวัสดี", "สวัสดีครับ", "สวัสดีค่ะ", "ขอบคุณ", "ขอบคุณครับ", "ขอบคุณค่ะ",
  "ขอโทษ", "ไม่เป็นไร", "แล้วเจอกัน", "โอเค", "เดี๋ยว", "รอก่อน", "โอเคครับ",

  // Digital / chat slang (Thai)
  "อิอิ", "ฮ่าๆ", "ฮ่าฮ่า", "555", "5555", "งง", "โอ้โห", "ว้าว", "อ๋อ",
  "อ้าว", "เฮ้ย", "โอ้", "อุ๊ย", "แอบ", "ปิ๊ง", "ยิ้ม",

  // Numbers as Thai words
  "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ",
  "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน",
]);

const THAI_RE = /[฀-๿]/;
const MAPPABLE = new Set(Object.keys(EN_TO_TH));

// Number row Thai chars to EN numbers
const NUMBER_ROW_TH_TO_EN: Record<string, string> = {
  'ๅ': '1', '/': '2', '-': '3', 'ภ': '4', 'ถ': '5',
  'ุ': '6', 'ึ': '7', 'ค': '8', 'ต': '9', 'จ': '0'
};

// Thai digits to ASCII numbers
const THAI_DIGIT_TO_ASCII: Record<string, string> = {
  '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
  '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
};

function en_to_th(text: string): string {
  return text.split('').map(c => EN_TO_TH[c] || c).join('');
}

function th_to_en(text: string): string {
  const result: string[] = [];
  for (const c of text) {
    if (c.charCodeAt(0) < 128) {
      // ASCII → pass through
      result.push(c);
    } else if (c in NUMBER_ROW_TH_TO_EN) {
      // Number row Thai char → map to number
      result.push(NUMBER_ROW_TH_TO_EN[c]);
    } else if (c in THAI_DIGIT_TO_ASCII) {
      // Thai digit → map to ASCII digit
      result.push(THAI_DIGIT_TO_ASCII[c]);
    } else {
      // Thai → lookup reverse map
      result.push(TH_TO_EN[c] || c);
    }
  }
  return result.join('');
}

function fix_token(token: string): string {
  // Whitespace → pass through
  if (/^\s+$/.test(token)) return token;

  // Real EN word → keep
  if (REAL_EN.has(token.toLowerCase())) return token;

  // Pure number → keep
  if (/^\d+$/.test(token)) return token;

  // Number sequence from Thai number row → convert
  if (/^[\d/_\-]+$/.test(token)) {
    const mapping: Record<string, string> = { '/': '2', '_': '3', '-': '4' };
    return token.split('').map(c => mapping[c] || c).join('');
  }

  // Mappable chars > 30% → en_to_th
  const mappable = token.split('').filter(c => MAPPABLE.has(c)).length;
  if (token.length > 0 && mappable / token.length > 0.3) {
    return en_to_th(token);
  }

  return token;
}

function fix_thai_segment(text: string): string {
  const tokens = text.split(/(\s+)/);
  return tokens.map(tok => {
    if (/^\s+$/.test(tok)) return tok;
    if (REAL_TH.has(tok)) return tok; // Keep real Thai words
    return th_to_en(tok); // Convert other Thai text
  }).join('');
}

function fix_ascii_segment(text: string): string {
  const tokens = text.split(/(\s+)/);
  return tokens.map(tok => fix_token(tok)).join('');
}

export function fix(text: string): string {
  if (!text.trim()) return text;

  const has_thai = THAI_RE.test(text);

  if (has_thai) {
    // TH→EN mode — split into segments
    const parts = text.split(/([฀-๿]+(?:[/_\-]*[฀-๿]+|[/\-_\d]*)?)/);
    const result: string[] = [];

    for (const part of parts) {
      if (!part) continue;

      if (THAI_RE.test(part)) {
        // Thai segment → check for real Thai words first
        result.push(fix_thai_segment(part));
      } else {
        // ASCII segment → token by token
        result.push(fix_ascii_segment(part));
      }
    }
    return result.join('');
  } else {
    // EN→TH mode — token by token
    return fix_ascii_segment(text);
  }
}
