import { useState } from "react";
import { useChat } from "./hooks/useChat";
import { useTheme } from "./hooks/useTheme";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const {
    messages,
    isLoading,
    sessionId,
    sessions,
    error,
    sendMessage,
    startNewChat,
    switchSession,
    deleteSession,
  } = useChat();

  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectSession = (id: string) => {
    switchSession(id);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    startNewChat();
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          sessions={sessions}
          currentSessionId={sessionId}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          onDeleteSession={deleteSession}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}

export default App;
