/**
 * aiClient.js
 * ------------------------------------------------------------------
 * Abstraction seam between the chat UI and "whatever actually
 * produces the reply". Out of the box this runs the local
 * conversationEngine (deterministic, offline, zero cost). If you
 * later stand up a real LLM backend (Anthropic/OpenAI proxy, your
 * own Node/Express endpoint, etc.), set VITE_CHAT_API_URL and this
 * client will call it instead — no changes needed anywhere else in
 * the app.
 *
 * Expected backend contract (POST VITE_CHAT_API_URL):
 *   Request:  { message: string, history: {role, content}[], leadState: object|null }
 *   Response: { text: string, suggestions?: string[], triggerLead?: string, leadState?: object }
 * ------------------------------------------------------------------
 */

import { processTurn, createInitialConversationState } from "../engine/conversationEngine";

const REMOTE_ENDPOINT =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_CHAT_API_URL
    ? import.meta.env.VITE_CHAT_API_URL
    : null;

async function callRemoteEngine({ message, history, conversationState }) {
  const res = await fetch(REMOTE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, leadState: conversationState?.lead || null }),
  });

  if (!res.ok) throw new Error(`Chat backend responded with ${res.status}`);
  const data = await res.json();

  return {
    reply: { text: data.text, suggestions: data.suggestions || [] },
    state: { ...conversationState, lead: data.leadState || null },
  };
}

function callLocalEngine({ message, conversationState }) {
  return processTurn(conversationState, message);
}

/**
 * Get a reply for the given message. Always resolves (never rejects)
 * with a usable { reply, state } — falls back to the local engine if
 * a remote backend is configured but unreachable, so the assistant
 * never goes silent.
 */
export async function getAssistantReply({ message, history = [], conversationState }) {
  const state = conversationState || createInitialConversationState();

  if (REMOTE_ENDPOINT) {
    try {
      return await callRemoteEngine({ message, history, conversationState: state });
    } catch (err) {
      // Silent, graceful fallback — the assistant should never break.
      console.warn("[DeepMind AI Assistant] Remote engine unavailable, using local engine.", err);
      return callLocalEngine({ message, conversationState: state });
    }
  }

  return callLocalEngine({ message, conversationState: state });
}

export function createInitialState() {
  return createInitialConversationState();
}

export default { getAssistantReply, createInitialState };
