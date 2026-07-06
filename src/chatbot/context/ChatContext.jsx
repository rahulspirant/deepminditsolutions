import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { getAssistantReply, createInitialState } from "../api/aiClient";
import { streamText } from "../utils/streamText";
import { loadHistory, saveHistory, loadConversationState, saveConversationState, clearStoredChat } from "../utils/storage";
import { suggestedQuestions } from "../engine/knowledgeBase";

const ChatContext = createContext(null);

function makeMessage(role, text, extra = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role, // "user" | "assistant"
    text,
    timestamp: Date.now(),
    ...extra,
  };
}

const WELCOME_MESSAGE = () =>
  makeMessage(
    "assistant",
    "Hi, I'm the **DeepMind AI Assistant** 👋 — your on-demand IT consultant for Deep Mind IT Solutions.\n\nAsk me about our services, products, pricing direction, or tell me about your business and I'll recommend the right solution.",
    { suggestions: suggestedQuestions.slice(0, 4) }
  );

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const stored = loadHistory();
    return stored && stored.length ? stored : [WELCOME_MESSAGE()];
  });
  const [conversationState, setConversationState] = useState(() => loadConversationState() || createInitialState());
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const cancelRef = useRef(false);
  const lastUserMessageRef = useRef(null);

  const persist = useCallback((nextMessages, nextState) => {
    saveHistory(nextMessages);
    saveConversationState(nextState);
  }, []);

  const runAssistantTurn = useCallback(
    async (userText, historySoFar) => {
      cancelRef.current = false;
      setIsThinking(true);

      let result;
      try {
        result = await getAssistantReply({
          message: userText,
          history: historySoFar.map((m) => ({ role: m.role, content: m.text })),
          conversationState,
        });
      } catch (err) {
        result = {
          reply: {
            text: "Something interrupted me there — could you try asking that again? If it keeps happening, our team is reachable directly at sales@deepminditsolutions.com.",
            suggestions: [],
          },
          state: conversationState,
        };
      }

      setIsThinking(false);
      setIsStreaming(true);

      const assistantMsg = makeMessage("assistant", "", { suggestions: result.reply.suggestions || [], streaming: true });
      setMessages((prev) => {
        const next = [...prev, assistantMsg];
        return next;
      });

      await streamText(
        result.reply.text,
        (partial) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, text: partial } : m))
          );
        },
        () => cancelRef.current
      );

      setMessages((prev) => {
        const finalized = prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, text: result.reply.text, streaming: false } : m
        );
        persist(finalized, result.state);
        return finalized;
      });

      setConversationState(result.state);
      setIsStreaming(false);
    },
    [conversationState, persist]
  );

  const sendMessage = useCallback(
    (rawText) => {
      const text = rawText.trim();
      if (!text || isThinking || isStreaming) return;

      lastUserMessageRef.current = text;
      const userMsg = makeMessage("user", text);
      setMessages((prev) => {
        const next = [...prev, userMsg];
        persist(next, conversationState);
        return next;
      });

      runAssistantTurn(text, [...messages, userMsg]);
    },
    [isThinking, isStreaming, messages, conversationState, persist, runAssistantTurn]
  );

  const stopGenerating = useCallback(() => {
    cancelRef.current = true;
  }, []);

  const regenerate = useCallback(() => {
    if (!lastUserMessageRef.current || isThinking || isStreaming) return;
    // Drop the last assistant message and re-run.
    setMessages((prev) => {
      const idx = [...prev].reverse().findIndex((m) => m.role === "assistant");
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      const trimmed = prev.slice(0, realIdx);
      runAssistantTurn(lastUserMessageRef.current, trimmed);
      return trimmed;
    });
  }, [isThinking, isStreaming, runAssistantTurn]);

  const clearChat = useCallback(() => {
    clearStoredChat();
    const fresh = [WELCOME_MESSAGE()];
    setMessages(fresh);
    const freshState = createInitialState();
    setConversationState(freshState);
    persist(fresh, freshState);
  }, [persist]);

  const copyMessage = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      isThinking,
      isStreaming,
      sendMessage,
      stopGenerating,
      regenerate,
      clearChat,
      copyMessage,
    }),
    [isOpen, openChat, closeChat, toggleChat, messages, isThinking, isStreaming, sendMessage, stopGenerating, regenerate, clearChat, copyMessage]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}

export default ChatContext;
