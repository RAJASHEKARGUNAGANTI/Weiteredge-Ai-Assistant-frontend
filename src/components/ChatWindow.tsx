import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { Message } from "../services/api";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
}

export default function ChatWindow({
  messages,
  isLoading,
  error,
  onSend,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Support Assistant
        </h1>
        <p className="text-xs text-gray-400">
          Ask questions about our products and services
        </p>
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
