import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({ inline, className, children }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");

  if (inline) {
    return <code className="dm-chat-inline-code">{code}</code>;
  }

  const language = (className || "").replace("language-", "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  return (
    <div className="dm-chat-codeblock">
      <div className="dm-chat-codeblock-header">
        <span>{language || "code"}</span>
        <button type="button" onClick={handleCopy} className="dm-chat-codeblock-copy" aria-label="Copy code">
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code className={className}>{code}</code>
      </pre>
    </div>
  );
}

export const markdownComponents = {
  code: CodeBlock,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="dm-chat-link">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="dm-chat-table-wrap">
      <table className="dm-chat-table">{children}</table>
    </div>
  ),
  ul: ({ children }) => <ul className="dm-chat-ul">{children}</ul>,
  ol: ({ children }) => <ol className="dm-chat-ol">{children}</ol>,
  p: ({ children }) => <p className="dm-chat-p">{children}</p>,
};

export default markdownComponents;
