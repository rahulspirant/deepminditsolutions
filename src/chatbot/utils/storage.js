/**
 * storage.js
 * ------------------------------------------------------------------
 * Thin, defensive wrapper around localStorage for chat history
 * persistence. Fails silently (private browsing / storage disabled)
 * so the widget still works even without persistence.
 * ------------------------------------------------------------------
 */

const HISTORY_KEY = "deepmind_ai_chat_history_v1";
const STATE_KEY = "deepmind_ai_chat_state_v1";
const MAX_STORED_MESSAGES = 100;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveHistory(messages) {
  try {
    const trimmed = messages.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export function loadConversationState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConversationState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function clearStoredChat() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(STATE_KEY);
  } catch {
    // ignore
  }
}

export default { loadHistory, saveHistory, loadConversationState, saveConversationState, clearStoredChat };
