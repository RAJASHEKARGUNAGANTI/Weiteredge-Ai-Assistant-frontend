import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { Message } from "../services/api";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onToggleSidebar: () => void;
}

export default function ChatWindow({
  messages,
  isLoading,
  error,
  onSend,
  onToggleSidebar,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-4 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 hover:bg-gray-100 transition-colors md:hidden"
          title="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Support Assistant
          </h1>
          <p className="text-xs text-gray-400">
            Ask questions about our products and services
          </p>
        </div>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />

      {error && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
