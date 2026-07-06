import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function ChatButton() {
  const { isOpen, toggleChat } = useChat();

  return (
    <motion.button
      type="button"
      className="dm-chat-fab"
      onClick={toggleChat}
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="dm-chat-fab-pulse" aria-hidden="true" />
      <span className="dm-chat-fab-glow" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dm-chat-fab-icon"
          >
            <X size={24} />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dm-chat-fab-icon"
          >
            <MessageSquare size={24} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
