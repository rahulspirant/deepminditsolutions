/**
 * conversationEngine.js
 * ------------------------------------------------------------------
 * The single function the UI calls per turn. Owns the decision of
 * whether we're mid-lead-capture, need to start one, or should just
 * run a normal NLU -> response turn. Framework/UI agnostic — pure
 * function of (conversationState, userMessage) -> { reply, nextState }.
 * ------------------------------------------------------------------
 */

import { analyze } from "./nlu";
import { generateResponse } from "./responseGenerator";
import { createLeadState, currentPrompt, advanceLeadState, formatLeadSummary, LEAD_FIELDS } from "./leadCapture";

export function createInitialConversationState() {
  return {
    lead: null, // active lead-capture flow, if any
  };
}

/**
 * Handle explicit user intent to cancel a lead flow mid-way.
 */
function isCancelPhrase(text) {
  const t = text.trim().toLowerCase();
  return ["cancel", "stop", "never mind", "nevermind", "skip"].includes(t);
}

/**
 * Runs one conversational turn.
 * @param {object} state - previous conversation state
 * @param {string} userText - the raw message the user typed
 * @returns {{ reply: {text: string, suggestions: string[]}, state: object }}
 */
export function processTurn(state, userText) {
  const conversationState = state || createInitialConversationState();

  // --- Mid lead-capture flow ------------------------------------
  if (conversationState.lead && conversationState.lead.active && !conversationState.lead.completed) {
    if (isCancelPhrase(userText)) {
      return {
        reply: { text: "No problem — cancelled that. Anything else I can help you with?", suggestions: [] },
        state: { ...conversationState, lead: null },
      };
    }

    const nextLead = advanceLeadState(conversationState.lead, userText);

    if (!nextLead.completed) {
      const prompt = currentPrompt(nextLead);
      return {
        reply: { text: prompt, suggestions: [] },
        state: { ...conversationState, lead: nextLead },
      };
    }

    // Flow just completed — summarize and close out.
    const summary = formatLeadSummary(nextLead.data);
    const text = [
      "Thank you. Our team will contact you shortly.",
      "",
      "Here's a quick summary of what I've noted:",
      "",
      summary,
    ].join("\n");

    return {
      reply: { text, suggestions: ["Ask another question", "Tell me about your services"] },
      state: { ...conversationState, lead: { ...nextLead, active: false }, lastLead: nextLead.data },
    };
  }

  // --- Normal turn -------------------------------------------------
  const analysis = analyze(userText);
  const response = generateResponse(analysis);

  if (response.triggerLead) {
    const lead = createLeadState(response.triggerLead);
    const prompt = currentPrompt(lead);
    const combinedText = response.text ? `${response.text}\n\n${prompt}` : prompt;
    return {
      reply: { text: combinedText, suggestions: [] },
      state: { ...conversationState, lead },
    };
  }

  return {
    reply: { text: response.text, suggestions: response.suggestions || [] },
    state: conversationState,
  };
}

export const totalLeadFields = LEAD_FIELDS.length;

export default { createInitialConversationState, processTurn };
