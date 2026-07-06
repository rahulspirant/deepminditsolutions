import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Paperclip, Send, Square, X } from "lucide-react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const MAX_FILE_SIZE_MB = 10;

export default function ChatInput({ onSend, onStop, disabled, isStreaming }) {
  const [value, setValue] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [fileError, setFileError] = useState("");
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const { isSupported: micSupported, isListening, toggle: toggleMic } = useSpeechRecognition({
    onResult: (transcript) => setValue(transcript),
  });

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSend = () => {
    const text = value.trim();
    if (!text && !attachment) return;
    const finalText = attachment ? `${text ? text + "\n\n" : ""}📎 Attached file: ${attachment.name}` : text;
    onSend(finalText);
    setValue("");
    setAttachment(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File is larger than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setFileError("");
    setAttachment({ name: file.name, size: file.size });
    e.target.value = "";
  };

  return (
    <div className="dm-chat-input-area">
      {attachment && (
        <div className="dm-chat-attachment-chip">
          <Paperclip size={12} />
          <span>{attachment.name}</span>
          <button type="button" onClick={() => setAttachment(null)} aria-label="Remove attachment">
            <X size={12} />
          </button>
        </div>
      )}
      {fileError && <div className="dm-chat-file-error">{fileError}</div>}

      <div className="dm-chat-input-row">
        <button
          type="button"
          className="dm-chat-input-icon-btn"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach a file"
          title="Attach a file"
          disabled={disabled}
        >
          <Paperclip size={17} />
        </button>
        <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />

        <textarea
          ref={textareaRef}
          className="dm-chat-textarea"
          placeholder="Ask about services, products, pricing, or your business needs…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />

        {micSupported && (
          <button
            type="button"
            className={`dm-chat-input-icon-btn ${isListening ? "dm-chat-mic-active" : ""}`}
            onClick={toggleMic}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            title="Voice input"
            disabled={disabled}
          >
            <Mic size={17} />
          </button>
        )}

        {isStreaming ? (
          <motion.button
            type="button"
            className="dm-chat-send-btn dm-chat-stop-btn"
            onClick={onStop}
            whileTap={{ scale: 0.92 }}
            aria-label="Stop generating"
            title="Stop generating"
          >
            <Square size={15} />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="dm-chat-send-btn"
            onClick={handleSend}
            whileTap={{ scale: 0.92 }}
            disabled={disabled || (!value.trim() && !attachment)}
            aria-label="Send message"
            title="Send"
          >
            <Send size={16} />
          </motion.button>
        )}
      </div>
      <p className="dm-chat-input-hint">Enter to send · Shift + Enter for a new line</p>
    </div>
  );
}
