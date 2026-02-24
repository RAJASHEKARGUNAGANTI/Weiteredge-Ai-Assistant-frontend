import { BotMessageSquare, Sun, Moon } from "lucide-react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { Message } from "../services/api";

type Theme = "light" | "dark";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onToggleSidebar: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function ChatWindow({
  messages,
  isLoading,
  error,
  onSend,
  onToggleSidebar,
  theme,
  onToggleTheme,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden text-gray-700 dark:text-gray-200"
          title="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
          <BotMessageSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Support Assistant
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Ask questions about our products and services
          </p>
        </div>
        <button
          onClick={onToggleTheme}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />

      {error && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
