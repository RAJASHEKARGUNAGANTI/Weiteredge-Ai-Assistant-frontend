import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Session {
  id: string;
  created_at: string;
  updated_at: string;
  title: string | null;
}

export interface ChatResponse {
  reply: string;
  tokensUsed: number;
}

export async function sendChat(
  sessionId: string,
  message: string
): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>("/chat", {
    sessionId,
    message,
  });
  return data;
}

export async function getConversation(
  sessionId: string
): Promise<Message[]> {
  const { data } = await api.get<{ sessionId: string; messages: Message[] }>(
    `/conversations/${sessionId}`
  );
  return data.messages;
}

export async function getSessions(): Promise<Session[]> {
  const { data } = await api.get<{ sessions: Session[] }>("/sessions");
  return data.sessions;
}

export async function deleteSessionApi(sessionId: string): Promise<void> {
  await api.delete(`/sessions/${sessionId}`);
}
