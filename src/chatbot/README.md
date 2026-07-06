# DeepMind AI Assistant — Integration Notes

## What this is

A production-ready, floating AI chat widget for the Deep Mind IT Solutions
site. It's already wired into `src/App.jsx` — no further setup needed to see
it running, beyond installing two extra packages (see below).

## Install the two extra dependencies

Everything else (`framer-motion`, `lucide-react`, `react-router-dom`) is
already used elsewhere in this codebase. You only need to add:

```bash
npm install react-markdown remark-gfm
```

## Architecture

```
src/chatbot/
├── engine/                  Pure-JS "brain" — no React, fully unit-testable
│   ├── knowledgeBase.js     Company/services/products/industries/contact facts
│   ├── nlu.js                Intent scoring + fuzzy matching + entity extraction
│   ├── recommendationEngine.js  Business-profile → solution bundle logic
│   ├── leadCapture.js        Conversational lead-capture state machine
│   ├── responseGenerator.js  Intent -> markdown reply composer
│   └── conversationEngine.js Orchestrates the above per turn
├── api/
│   └── aiClient.js           Pluggable seam: local engine by default,
│                              swaps to a hosted LLM if VITE_CHAT_API_URL is set
├── context/
│   └── ChatContext.jsx       All chat state (Context API, per the brief)
├── hooks/
│   ├── useAutoScroll.js
│   └── useSpeechRecognition.js  Real Web Speech API voice input
├── utils/
│   ├── streamText.js         Simulated token streaming for the typing effect
│   ├── storage.js            localStorage persistence (chat history)
│   └── markdownComponents.jsx  Code blocks w/ copy button, tables, safe links
├── components/               Presentational pieces (button, window, bubbles…)
├── ChatWidget.jsx             Mount point
└── ChatWidget.css             All widget styling (uses the site's --dm-* tokens)
```

## How answers are generated today

There's no per-message API call — everything runs locally in the browser via
`engine/conversationEngine.js`. It classifies each message into an intent
(greeting, service question, pricing, support, recommendation request, etc.)
using weighted + typo-tolerant keyword matching against a real knowledge base
pulled from this site's actual services/products/industries/contact content,
then composes a markdown reply. This means: zero API cost, works offline,
and never contradicts what's on the site.

## Upgrading to a hosted LLM later

`api/aiClient.js` is the only file that needs to change. Set an environment
variable:

```bash
VITE_CHAT_API_URL=https://your-backend.example.com/api/chat
```

and point it at a backend that accepts `{ message, history, leadState }` and
returns `{ text, suggestions, leadState }`. The rest of the app (UI, context,
storage, streaming) needs no changes — `aiClient.js` also falls back to the
local engine automatically if that endpoint is unreachable, so the assistant
never goes silent.

## Notable behaviors

- **Lead capture**: buying-intent phrases ("I need a quote", "schedule a
  meeting", pricing questions) trigger a one-question-at-a-time flow that
  collects Name, Company, Phone, Email, Requirement, Budget, Location, and
  Meeting Time, then confirms with "Thank you. Our team will contact you
  shortly."
- **Smart recommendations**: mentioning an employee count ("we have 100
  employees") or a business type ("we run a hospital") returns a tailored
  bundle of services/products.
- **Voice input**: uses the browser's native SpeechRecognition API — the mic
  button only appears in browsers that support it.
- **File attach**: attaches a file reference to the outgoing message (name +
  size); there's no backend file analysis since this ships with no server.
- **Persistence**: chat history and lead-flow state persist to `localStorage`
  so a page refresh doesn't lose the conversation.
