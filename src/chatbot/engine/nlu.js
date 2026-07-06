/**
 * nlu.js
 * ------------------------------------------------------------------
 * A dependency-free natural-language-understanding layer.
 *
 * It doesn't call an external LLM — it classifies free-text messages
 * into intents using weighted keyword/phrase scoring with fuzzy
 * (typo-tolerant) matching, and pulls out entities such as business
 * type or employee counts. This keeps the assistant fully functional
 * offline and with zero per-message API cost, while `api/aiClient.js`
 * still gives you a clean seam to swap in a hosted LLM later.
 * ------------------------------------------------------------------
 */

import { services, products, industries, buyingIntentKeywords } from "./knowledgeBase";

/** Normalize text: lowercase, strip punctuation, collapse whitespace. */
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s+/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Levenshtein distance, used for typo-tolerant keyword matching. */
function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const row = new Array(n + 1);
  for (let j = 0; j <= n; j++) row[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = temp;
    }
  }
  return row[n];
}

/** True if `word` fuzzily matches `target` (handles small typos). */
function fuzzyIncludes(haystack, needle) {
  if (haystack.includes(needle)) return true;
  if (needle.length < 4) return false;
  const words = haystack.split(" ");
  return words.some((w) => {
    if (Math.abs(w.length - needle.length) > 2) return false;
    return levenshtein(w, needle) <= (needle.length > 6 ? 2 : 1);
  });
}

function scoreKeywords(text, keywords) {
  let score = 0;
  const matched = [];
  for (const kw of keywords) {
    if (fuzzyIncludes(text, kw)) {
      score += kw.split(" ").length; // multi-word phrases score higher
      matched.push(kw);
    }
  }
  return { score, matched };
}

/**
 * Static intent definitions. Each has weighted trigger phrases.
 * Intents are checked in scoreAllIntents() and the highest-scoring
 * one wins, with ties broken by declaration order (more specific
 * intents are listed first).
 */
const INTENT_DEFINITIONS = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste", "yo"],
  },
  {
    id: "thanks",
    keywords: ["thank you", "thanks", "thank u", "appreciate it", "cheers"],
  },
  {
    id: "goodbye",
    keywords: ["bye", "goodbye", "see you", "talk later", "gtg"],
  },
  {
    id: "company_info",
    keywords: [
      "about your company", "about deep mind", "who are you", "tell me about your company",
      "company profile", "mission", "vision", "core values", "how long have you been",
      "experience do you have", "why choose you", "why should i choose",
    ],
  },
  {
    id: "careers",
    keywords: ["careers", "career", "job opening", "jobs", "hiring", "vacancy", "work with you", "join your team"],
  },
  {
    id: "contact_info",
    keywords: ["contact details", "contact number", "phone number", "email address", "your address", "office location", "how do i reach you", "get in touch"],
  },
  {
    id: "schedule_meeting",
    keywords: ["schedule a meeting", "book a meeting", "book a call", "schedule a call", "set up a call", "arrange a meeting", "can i schedule"],
  },
  {
    id: "pricing_inquiry",
    keywords: ["price", "pricing", "cost", "how much", "budget", "quotation", "quote", "rate card"],
  },
  {
    id: "support_inquiry",
    keywords: ["i need support", "support ticket", "technical support", "something is broken", "not working", "issue with", "help desk", "raise a ticket", "amc support"],
  },
  {
    id: "services_overview",
    keywords: ["services do you offer", "what services", "your services", "list of services", "what do you do"],
  },
  {
    id: "products_overview",
    keywords: ["your products", "what products", "list of products", "product catalog", "product range"],
  },
  {
    id: "industries_overview",
    keywords: ["industries you serve", "which industries", "sectors you work", "who are your clients"],
  },
  {
    id: "comparison",
    keywords: ["compare", "vs", "versus", "difference between", "which is better"],
  },
  {
    id: "recommendation_request",
    keywords: ["recommend", "suggest", "which service is best", "which product is best", "best solution for", "what should i buy", "what do i need"],
  },
  {
    id: "small_talk",
    keywords: ["how are you", "what's up", "who made you", "are you human", "are you real", "are you an ai", "tell me a joke", "what is your name"],
  },
];

/** Score every intent definition + the KB-derived service/product intents. */
export function scoreAllIntents(rawText) {
  const text = normalize(rawText);
  const scored = [];

  for (const def of INTENT_DEFINITIONS) {
    const { score, matched } = scoreKeywords(text, def.keywords);
    if (score > 0) scored.push({ id: def.id, type: "static", score, matched });
  }

  for (const svc of services) {
    const { score, matched } = scoreKeywords(text, svc.keywords);
    if (score > 0) scored.push({ id: svc.id, type: "service", score, matched, ref: svc });
  }

  for (const prod of products) {
    const { score, matched } = scoreKeywords(text, prod.keywords);
    if (score > 0) scored.push({ id: prod.id, type: "product", score, matched, ref: prod });
  }

  for (const ind of industries) {
    const { score, matched } = scoreKeywords(text, ind.keywords);
    if (score > 0) scored.push({ id: ind.id, type: "industry", score, matched, ref: ind });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

/** Extract a numeric employee-count entity, e.g. "we have 100 employees". */
export function extractEmployeeCount(rawText) {
  const text = normalize(rawText);
  const match = text.match(/(\d{1,5})\s*(employees|staff|people|users|desks|seats|computers|systems)/);
  if (match) return parseInt(match[1], 10);
  return null;
}

/** Detect buying intent (price/quote/purchase language) for lead capture. */
export function hasBuyingIntent(rawText) {
  const text = normalize(rawText);
  return buyingIntentKeywords.some((kw) => fuzzyIncludes(text, kw));
}

/** Detect a plain email address in free text. */
export function extractEmail(rawText) {
  const match = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

/** Detect an Indian-style or generic phone number in free text. */
export function extractPhone(rawText) {
  const match = rawText.match(/(\+?\d[\d\s-]{7,14}\d)/);
  return match ? match[0].trim() : null;
}

/**
 * Top-level analyze() — the single entry point the conversation
 * engine calls for every incoming user message.
 */
export function analyze(rawText) {
  const scored = scoreAllIntents(rawText);
  const top = scored[0] || null;
  return {
    text: rawText,
    normalized: normalize(rawText),
    topIntent: top,
    allIntents: scored,
    employeeCount: extractEmployeeCount(rawText),
    buyingIntent: hasBuyingIntent(rawText),
    email: extractEmail(rawText),
    phone: extractPhone(rawText),
  };
}
