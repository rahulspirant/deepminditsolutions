import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Check, Copy, RotateCcw, User } from "lucide-react";
import { markdownComponents } from "../utils/markdownComponents";
import SuggestedQuestions from "./SuggestedQuestions";

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function MessageBubble({ message, isLast, onCopy, onRegenerate, onSuggestionSelect, busy }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    const ok = await onCopy(message.text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      className={`dm-chat-row ${isUser ? "dm-chat-row-user" : "dm-chat-row-assistant"}`}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {!isUser && (
        <div className="dm-chat-avatar dm-chat-avatar-assistant">
          <Bot size={14} />
        </div>
      )}

      <div className={`dm-chat-bubble ${isUser ? "dm-chat-bubble-user" : "dm-chat-bubble-assistant"}`}>
        <div className="dm-chat-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {message.text || " "}
          </ReactMarkdown>
          {message.streaming && <span className="dm-chat-caret" aria-hidden="true" />}
        </div>

        {!message.streaming && message.suggestions && message.suggestions.length > 0 && (
          <SuggestedQuestions questions={message.suggestions} onSelect={onSuggestionSelect} disabled={busy} />
        )}

        <div className="dm-chat-bubble-footer">
          <span className="dm-chat-timestamp">{formatTime(message.timestamp)}</span>
          {!isUser && !message.streaming && message.text && (
            <span className="dm-chat-bubble-actions">
              <button type="button" className="dm-chat-icon-btn" onClick={handleCopy} aria-label="Copy message" title="Copy">
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
              {isLast && (
                <button
                  type="button"
                  className="dm-chat-icon-btn"
                  onClick={onRegenerate}
                  aria-label="Regenerate response"
                  title="Regenerate"
                  disabled={busy}
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </span>
          )}
        </div>
      </div>

      {isUser && (
        <div className="dm-chat-avatar dm-chat-avatar-user">
          <User size={14} />
        </div>
      )}
    </motion.div>
  );
}
