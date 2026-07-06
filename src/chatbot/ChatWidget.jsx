import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ChatButton from "./components/ChatButton";
import { useChat } from "./context/ChatContext";
import "./ChatWidget.css";

// ChatWindow pulls in react-markdown + remark-gfm to render assistant
// replies. Those are sizeable deps most visitors never need (they never
// open the chat), so this is fetched on demand instead of shipping in
// the main bundle.
const ChatWindow = lazy(() => import("./components/ChatWindow"));

/**
 * ChatWidget
 * ------------------------------------------------------------------
 * Mount this once, anywhere inside <ChatProvider>. It renders the
 * floating launcher button (always visible) plus the chat window
 * (mounted/animated only while open). Positioned fixed bottom-right
 * so it can simply be dropped into App.jsx.
 * ------------------------------------------------------------------
 */
export default function ChatWidget() {
  const { isOpen } = useChat();

  return (
    <div className="dm-chat-widget-root">
      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={null}>
            <ChatWindow key="chat-window" />
          </Suspense>
        )}
      </AnimatePresence>
      <ChatButton />
    </div>
  );
}
