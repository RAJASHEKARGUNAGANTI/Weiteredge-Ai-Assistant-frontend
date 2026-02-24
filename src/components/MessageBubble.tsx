import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Bot } from "lucide-react";
import type { Message } from "../services/api";
import { formatTime } from "../utils/formatTime";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const time = formatTime(message.created_at);

  return (
    <div
      className={`flex items-start gap-3 px-4 py-2 max-w-3xl mx-auto ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
            : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[520px] ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-sm"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">{time}</span>
      </div>
    </div>
  );
}
