import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useAutoScroll } from "../hooks/useAutoScroll";

export default function MessageList({ messages, isThinking, isStreaming, onCopy, onRegenerate, onSuggestionSelect }) {
  const { containerRef, handleScroll } = useAutoScroll(messages.length + (isThinking ? 1 : 0));

  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div className="dm-chat-messages" ref={containerRef} onScroll={handleScroll}>
      <AnimatePresence initial={false}>
        {messages.map((message, i) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={i === lastAssistantIndex && !isStreaming}
            onCopy={onCopy}
            onRegenerate={onRegenerate}
            onSuggestionSelect={onSuggestionSelect}
            busy={isThinking || isStreaming}
          />
        ))}
        {isThinking && <TypingIndicator key="thinking-indicator" />}
      </AnimatePresence>
    </div>
  );
}
