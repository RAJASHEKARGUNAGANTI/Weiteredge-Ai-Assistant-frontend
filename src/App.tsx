import { useChat } from "./hooks/useChat";
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

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        sessions={sessions}
        currentSessionId={sessionId}
        onNewChat={startNewChat}
        onSelectSession={switchSession}
        onDeleteSession={deleteSession}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
