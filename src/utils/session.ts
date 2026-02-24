import { v4 as uuidv4 } from "uuid";

const SESSION_KEY = "sessionId";

export function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function createNewSessionId(): string {
  const id = uuidv4();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

export function setSessionId(id: string): void {
  localStorage.setItem(SESSION_KEY, id);
}
