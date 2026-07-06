import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="dm-chat-row dm-chat-row-assistant">
      <div className="dm-chat-avatar dm-chat-avatar-assistant">
        <Sparkles size={14} />
      </div>
      <div className="dm-chat-bubble dm-chat-bubble-assistant dm-chat-thinking">
        <span className="dm-chat-thinking-label">Thinking</span>
        <span className="dm-chat-dots" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="dm-chat-dot"
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
