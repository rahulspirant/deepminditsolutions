/**
 * responseGenerator.js
 * ------------------------------------------------------------------
 * Turns an NLU analysis into an actual reply: professional,
 * consultative, markdown-formatted text plus optional follow-up
 * suggestion chips. Every branch pivots toward a helpful next step
 * instead of ever saying "I don't know" (per the system prompt spec).
 * ------------------------------------------------------------------
 */

import { company, contact, careers, services, products, industries, suggestedQuestions } from "./knowledgeBase";
import { getRecommendation } from "./recommendationEngine";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function serviceCard(svc) {
  return `**${svc.title}**\n${svc.description}\n${svc.highlights.map((h) => `- ${h}`).join("\n")}`;
}

function productCard(prod) {
  return `**${prod.title}**\n${prod.description}\n${prod.bullets.map((b) => `- ${b}`).join("\n")}`;
}

const OPENERS = {
  greeting: [
    "Hey there! 👋 I'm the DeepMind AI Assistant — think of me as your on-call IT consultant.",
    "Hi! Great to have you here. I can help with services, products, pricing direction, or booking a call with our team.",
  ],
  thanks: [
    "Anytime! 🙌 If anything else comes up — networking, cloud, security, whatever — I'm right here.",
    "You're very welcome. Happy to dig into anything else on your mind.",
  ],
  goodbye: [
    "Take care! If you need us again, I'll be right here — or you can reach the team directly at " + contact.email + ".",
  ],
};

function respondGreeting() {
  return {
    text: `${pick(OPENERS.greeting)}\n\nI can help you with:\n- Understanding our **services** and **products**\n- Recommending the right solution for your business\n- Pointing you to **pricing**, **support**, or **careers**\n- Getting you booked in with our team\n\nWhat's on your mind?`,
    suggestions: suggestedQuestions.slice(0, 4),
  };
}

function respondThanks() {
  return { text: pick(OPENERS.thanks), suggestions: [] };
}

function respondGoodbye() {
  return { text: pick(OPENERS.goodbye), suggestions: [] };
}

function respondCompanyInfo() {
  const text = [
    `**${company.name}** — ${company.tagline}`,
    "",
    `We bring ${company.stats[0].value} of enterprise IT experience, with ${company.stats[1].value} deployments delivered and ${company.stats[2].value} clients supported.`,
    "",
    `**Mission:** ${company.mission}`,
    "",
    `**Vision:** ${company.vision}`,
    "",
    `**What sets us apart:**`,
    ...company.differentiators.slice(0, 4).map((d) => `- ${d}`),
  ].join("\n");
  return { text, suggestions: ["What services do you offer?", "Which industries do you serve?", "Contact details"] };
}

function respondServicesOverview() {
  const text = [
    "Here's the full picture of what we cover, end to end:",
    "",
    ...services.map((s) => `- **${s.title}** — ${s.description}`),
    "",
    "Want me to go deeper on any one of these, or recommend a bundle based on your business?",
  ].join("\n");
  return { text, suggestions: ["Which service is best for my business?", "Tell me about Cyber Security", "Tell me about Cloud Solutions"] };
}

function respondProductsOverview() {
  const text = [
    "On the product side, we supply and deploy:",
    "",
    ...products.map((p) => `- **${p.title}** — ${p.description}`),
    "",
    "Let me know your use case and I'll narrow this down to what actually fits.",
  ].join("\n");
  return { text, suggestions: ["Do you sell Dell Servers?", "What firewall should I buy?", "Do you provide CCTV installation?"] };
}

function respondIndustriesOverview() {
  const text = [
    "We work across a wide range of sectors, including:",
    "",
    ...industries.map((i) => `- **${i.title}** — ${i.text}`),
  ].join("\n");
  return { text, suggestions: ["Recommend solutions for my business", "Tell me about your company"] };
}

function respondService(svc) {
  const text = [
    serviceCard(svc),
    "",
    `This typically pairs well with our other services if you're modernizing more broadly. Want a tailored recommendation, or shall I get you a consultation booked?`,
  ].join("\n");
  return { text, suggestions: ["Recommend solutions for my business", "I want to schedule a meeting", "What does this cost?"] };
}

function respondProduct(prod) {
  const text = [
    productCard(prod),
    "",
    `Exact pricing depends on brand, capacity, and site requirements — happy to line up a quick consultation so we can size this correctly for you.`,
  ].join("\n");
  return { text, suggestions: ["Get me a quote", "I want to schedule a meeting", "What else do you offer?"] };
}

function respondIndustry(ind) {
  const text = `**${ind.title}**\n${ind.text}\n\nWant me to put together a recommended solution bundle for this kind of environment?`;
  return { text, suggestions: ["Recommend solutions for my business", "Tell me about your services"] };
}

function respondPricing() {
  const text = [
    "Pricing depends on scope — brand, capacity, site count, and how deep the integration goes — so I won't guess a number that doesn't fit your reality.",
    "",
    "What I *can* do is get one of our consultants to size this properly and send a clear quote. Want me to set that up? I just need a few quick details.",
  ].join("\n");
  return { text, suggestions: ["Yes, set up a consultation", "Tell me about your services first"], triggerLead: "pricing" };
}

function respondSupport() {
  const text = [
    `For active support, our helpdesk is the fastest route: **${contact.supportPhone}** (${contact.hours}).`,
    "",
    "If you're an existing AMC/managed-IT client, mention your company name and our team will pull up your environment immediately. If this is a new issue you'd like us to look at, I can also get your details over to the team.",
  ].join("\n");
  return { text, suggestions: ["I want to schedule a meeting", "Tell me about Managed IT Services"] };
}

function respondCareers() {
  const text = [
    `We're always looking for strong infrastructure, security, and delivery talent. A few open roles right now:`,
    "",
    ...careers.openRoles.map((r) => `- **${r.title}** — ${r.type}, ${r.location}`),
    "",
    `Head to our [Careers page](${careers.cultureUrl}) to apply, or tell me a bit about your background and I'll point you in the right direction.`,
  ].join("\n");
  return { text, suggestions: ["Tell me about your company", "Contact details"] };
}

function respondContact() {
  const text = [
    `Here's how to reach us directly:`,
    "",
    `- **Address:** ${contact.address}`,
    `- **Sales:** ${contact.salesPhone}`,
    `- **Support:** ${contact.supportPhone}`,
    `- **Email:** ${contact.email}`,
    `- **Hours:** ${contact.hours}`,
    "",
    `Or, if it's easier, tell me what you need and I'll pass your details straight to the team.`,
  ].join("\n");
  return { text, suggestions: ["I want to schedule a meeting", "Which service is best for my business?"] };
}

function respondScheduleMeeting() {
  return {
    text: "Happy to get that booked. Let me grab a few quick details so the right consultant reaches out prepared — this'll take under a minute.",
    suggestions: [],
    triggerLead: "meeting",
  };
}

function respondRecommendation(rawText, employeeCount) {
  const rec = getRecommendation(rawText, employeeCount);
  if (!rec) {
    return {
      text: "Happy to recommend something tailored — could you tell me a bit more? For example, your industry (school, hospital, office, retail...) or roughly how many employees/systems you're supporting.",
      suggestions: ["We're an office with 50 employees", "We run a school", "We run a hospital"],
    };
  }
  const text = [
    `Based on ${rec.profileLabel}, here's what I'd recommend:`,
    "",
    ...rec.bundle.map((b) => `- ${b}`),
    "",
    "I can get a consultant to turn this into a proper proposal with sizing and pricing — want me to set that up?",
  ].join("\n");
  return { text, suggestions: ["Yes, set up a consultation", "Tell me more about one of these"], triggerLead: "recommendation" };
}

function respondComparison(rawText) {
  const text = [
    "Happy to help you compare. A few pointers so I steer you right:",
    "",
    "- If you're comparing **services** (e.g. Cloud vs. Managed IT), tell me both names and I'll break down what each solves.",
    "- If you're comparing **products** (e.g. two firewall brands or two servers), our recommendation is always vendor-neutral — based on your environment, not the easiest sale for us.",
    "",
    "What two things would you like compared?",
  ].join("\n");
  return { text, suggestions: ["Compare Firewall vs Managed IT", "Which server is best for a small office?"] };
}

function respondSmallTalk() {
  const lines = [
    "I'm the DeepMind AI Assistant — built to help you navigate our IT services and products like a consultant would, minus the wait for a callback. 🤖",
    "I run on a knowledge engine tuned to Deep Mind IT Solutions, so I'm most useful when you throw IT, infrastructure, or business questions at me — but ask away.",
  ];
  return { text: pick(lines), suggestions: suggestedQuestions.slice(0, 3) };
}

function respondFallback() {
  const text = [
    "That's a bit outside my usual IT-consulting lane, but let me point you the right way — could you tell me a little more about what you're trying to accomplish?",
    "",
    "In the meantime, here's what I'm best at:",
    "- Recommending the right service or product for your business",
    "- Explaining our services (Networking, Cloud, Security, Data Center, Managed IT, Software)",
    "- Getting you connected with a consultant for pricing or a demo",
  ].join("\n");
  return { text, suggestions: suggestedQuestions.slice(0, 3) };
}

/**
 * Main dispatcher. Takes the NLU `analysis` object (see nlu.js) and
 * returns { text, suggestions, triggerLead? }.
 */
export function generateResponse(analysis) {
  const top = analysis.topIntent;

  // Buying intent always nudges toward lead capture, even if another
  // intent scored slightly higher (e.g. "I want to buy a firewall").
  if (!top) {
    if (analysis.employeeCount || analysis.buyingIntent) {
      return respondRecommendation(analysis.text, analysis.employeeCount);
    }
    return respondFallback();
  }

  switch (top.type) {
    case "service":
      return respondService(top.ref);
    case "product":
      return respondProduct(top.ref);
    case "industry":
      return respondIndustry(top.ref);
    default:
      break;
  }

  switch (top.id) {
    case "greeting":
      return respondGreeting();
    case "thanks":
      return respondThanks();
    case "goodbye":
      return respondGoodbye();
    case "company_info":
      return respondCompanyInfo();
    case "careers":
      return respondCareers();
    case "contact_info":
      return respondContact();
    case "schedule_meeting":
      return respondScheduleMeeting();
    case "pricing_inquiry":
      return respondPricing();
    case "support_inquiry":
      return respondSupport();
    case "services_overview":
      return respondServicesOverview();
    case "products_overview":
      return respondProductsOverview();
    case "industries_overview":
      return respondIndustriesOverview();
    case "comparison":
      return respondComparison(analysis.text);
    case "recommendation_request":
      return respondRecommendation(analysis.text, analysis.employeeCount);
    case "small_talk":
      return respondSmallTalk();
    default:
      return respondFallback();
  }
}

export default { generateResponse };
