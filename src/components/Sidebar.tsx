import type { Session } from "../services/api";

interface SidebarProps {
  sessions: Session[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  const normalized = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T") + "Z";
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateStr;

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Today, ${time}`;

  const day = date.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${day}, ${time}`;
}

export default function Sidebar({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onClose,
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="p-4 flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="flex-1 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Chat
        </button>
        <button
          onClick={onClose}
          className="md:hidden rounded-lg p-2.5 hover:bg-gray-800 transition-colors"
          title="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {sessions.map((session) => {
          const isActive = session.id === currentSessionId;
          const title = session.title
            ? session.title.length > 30
              ? session.title.slice(0, 30) + "..."
              : session.title
            : "New conversation";

          return (
            <div
              key={session.id}
              className={`group relative rounded-lg transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <button
                onClick={() => onSelectSession(session.id)}
                className="w-full text-left px-3 py-2.5 text-sm"
              >
                <div className={`truncate font-medium ${isActive ? "text-white" : "text-gray-300"}`}>
                  {title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {formatDate(session.updated_at)}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-red-400 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete session"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Weitredge Support
        </p>
      </div>
    </div>
  );
}
