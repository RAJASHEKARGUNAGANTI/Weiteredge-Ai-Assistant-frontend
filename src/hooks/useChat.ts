import { useState, useEffect, useCallback } from "react";
import {
  sendChat,
  getConversation,
  getSessions,
  deleteSessionApi,
  type Message,
  type Session,
} from "../services/api";
import {
  getOrCreateSessionId,
  createNewSessionId,
  setSessionId as saveSessionId,
} from "../utils/session";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => getOrCreateSessionId());
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch {
      // Silently fail — sessions list is non-critical
    }
  }, []);

  const loadMessages = useCallback(async (sid: string) => {
    try {
      const data = await getConversation(sid);
      setMessages(data);
    } catch {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    loadSessions();
    loadMessages(sessionId);
  }, [sessionId, loadSessions, loadMessages]);

  const sendMessage = useCallback(
    async (text: string) => {
      setError(null);
      const userMsg: Message = {
        role: "user",
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const { reply } = await sendChat(sessionId, text);
        const assistantMsg: Message = {
          role: "assistant",
          content: reply,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        loadSessions();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to send message";
        setError(message);
        // Remove the optimistic user message on failure
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, loadSessions]
  );

  const startNewChat = useCallback(() => {
    const newId = createNewSessionId();
    setSessionId(newId);
    setMessages([]);
    setError(null);
  }, []);

  const switchSession = useCallback(
    (id: string) => {
      saveSessionId(id);
      setSessionId(id);
      setError(null);
      loadMessages(id);
    },
    [loadMessages]
  );

  const deleteSession = useCallback(
    async (id: string) => {
      try {
        await deleteSessionApi(id);
        setSessions((prev) => prev.filter((s) => s.id !== id));
        if (id === sessionId) {
          startNewChat();
        }
      } catch {
        setError("Failed to delete session");
      }
    },
    [sessionId, startNewChat]
  );

  return {
    messages,
    isLoading,
    sessionId,
    sessions,
    error,
    sendMessage,
    startNewChat,
    switchSession,
    deleteSession,
  };
}
