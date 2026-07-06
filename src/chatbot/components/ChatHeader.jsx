import { Sparkles, Trash2, X } from "lucide-react";

export default function ChatHeader({ onClose, onClear }) {
  return (
    <div className="dm-chat-header">
      <div className="dm-chat-header-brand">
        <span className="dm-chat-header-icon">
          <Sparkles size={16} />
        </span>
        <div>
          <p className="dm-chat-header-title">DeepMind AI Assistant</p>
          <p className="dm-chat-header-status">
            <span className="dm-chat-status-dot" />
            Online — ready to help
          </p>
        </div>
      </div>
      <div className="dm-chat-header-actions">
        <button type="button" className="dm-chat-icon-btn" onClick={onClear} aria-label="Clear chat" title="Clear chat">
          <Trash2 size={15} />
        </button>
        <button type="button" className="dm-chat-icon-btn" onClick={onClose} aria-label="Close chat" title="Close">
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
