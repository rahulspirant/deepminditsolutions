import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChat } from "../context/ChatContext";

const windowVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ChatWindow() {
  const {
    messages,
    isThinking,
    isStreaming,
    sendMessage,
    stopGenerating,
    regenerate,
    clearChat,
    copyMessage,
    closeChat,
  } = useChat();

  return (
    <motion.div
      className="dm-chat-window"
      variants={windowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-label="DeepMind AI Assistant chat window"
    >
      <div className="dm-chat-window-glow" aria-hidden="true" />
      <ChatHeader onClose={closeChat} onClear={clearChat} />

      <MessageList
        messages={messages}
        isThinking={isThinking}
        isStreaming={isStreaming}
        onCopy={copyMessage}
        onRegenerate={regenerate}
        onSuggestionSelect={sendMessage}
      />

      <ChatInput
        onSend={sendMessage}
        onStop={stopGenerating}
        disabled={isThinking || isStreaming}
        isStreaming={isStreaming}
      />
    </motion.div>
  );
}
