import { motion } from "framer-motion";

export default function SuggestedQuestions({ questions, onSelect, disabled }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="dm-chat-suggestions" role="group" aria-label="Suggested questions">
      {questions.map((q, i) => (
        <motion.button
          key={q}
          type="button"
          className="dm-chat-suggestion-chip"
          onClick={() => onSelect(q)}
          disabled={disabled}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
}
