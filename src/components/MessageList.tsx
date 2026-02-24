import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";
import type { Message } from "../services/api";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-3">💬</div>
          <p className="text-lg font-medium">Start a conversation</p>
          <p className="text-sm mt-1">Ask about our products and services</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-2">
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id ?? `${msg.role}-${i}`} message={msg} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
