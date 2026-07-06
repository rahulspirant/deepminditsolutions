/**
 * leadCapture.js
 * ------------------------------------------------------------------
 * A small state machine that drives the conversational lead-capture
 * flow. Instead of dropping a form into the chat, the assistant asks
 * for one field at a time, exactly like a human consultant would —
 * per the brief's "Lead Generation" spec (Name, Company, Phone,
 * Email, Requirement, Budget, Location, Meeting Time).
 * ------------------------------------------------------------------
 */

import { extractEmail, extractPhone } from "./nlu";

export const LEAD_FIELDS = [
  { key: "name", prompt: "Happy to help set that up. First, what's your **name**?" },
  { key: "company", prompt: "Thanks! Which **company** are you with?" },
  { key: "phone", prompt: "What's the best **phone number** to reach you on?" },
  { key: "email", prompt: "And your **email address**?" },
  { key: "requirement", prompt: "In a line or two, what's the **requirement** — what are you looking to set up or fix?" },
  { key: "budget", prompt: "Do you have an approximate **budget range** in mind? (You can say \"not sure yet\" — that's fine.)" },
  { key: "location", prompt: "What **city / location** is this for?" },
  { key: "meetingTime", prompt: "Last one — any preferred **day or time** for a quick call, or should our team reach out to schedule?" },
];

export function createLeadState(reason = "general") {
  return {
    active: true,
    reason, // e.g. "pricing", "meeting", "buying_intent"
    stepIndex: 0,
    data: {},
    completed: false,
  };
}

/** Returns the prompt for the current step, or null if the flow is done. */
export function currentPrompt(leadState) {
  if (!leadState || leadState.completed) return null;
  const field = LEAD_FIELDS[leadState.stepIndex];
  return field ? field.prompt : null;
}

/**
 * Feed the user's latest message into the lead flow. Returns a new
 * lead state with the answer stored and the pointer advanced.
 * Performs light validation/auto-extraction for phone & email so a
 * pasted "john@x.com, +91 98765 43210" still gets parsed sensibly.
 */
export function advanceLeadState(leadState, rawText) {
  const field = LEAD_FIELDS[leadState.stepIndex];
  if (!field) return { ...leadState, completed: true };

  let value = rawText.trim();

  if (field.key === "email") {
    value = extractEmail(rawText) || value;
  }
  if (field.key === "phone") {
    value = extractPhone(rawText) || value;
  }

  const data = { ...leadState.data, [field.key]: value };
  const nextIndex = leadState.stepIndex + 1;
  const completed = nextIndex >= LEAD_FIELDS.length;

  return {
    ...leadState,
    data,
    stepIndex: nextIndex,
    completed,
  };
}

export function formatLeadSummary(data) {
  const rows = LEAD_FIELDS.map((f) => `| ${f.key[0].toUpperCase()}${f.key.slice(1)} | ${data[f.key] || "—"} |`);
  return [
    "| Field | Details |",
    "|---|---|",
    ...rows,
  ].join("\n");
}

export default { LEAD_FIELDS, createLeadState, currentPrompt, advanceLeadState, formatLeadSummary };
