import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type ChatMessage =
  | { user: string; message: string; time: string }
  | { sender: string; receiver?: string; message: string; time: string };

const Chat: React.FC = () => {
  const user = useSelector((state: RootState) => state.appSlice.user) as {
    email: string;
  } | null;
  console.log(user);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (wsRef.current) return;
    const connectWebSocket = () => {
      const socket = new WebSocket("wss://jobecho-iex4.onrender.com");
      wsRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connected");
        isConnected.current = true;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Received message:", message);
          setMessages((prev: any) => {
            if (
              prev.some(
                (msg: any) =>
                  msg.message === message.message &&
                  msg.sender === message.sender
              )
            )
              return prev;
            return [
              ...prev,
              {
                sender: message.sender,
                receiver: message.receiver,
                message: message.message,
                time: new Date().toLocaleTimeString(),
              },
            ];
          });
        } catch (error) {
          console.error("Error parsing WebSocket message", error);
        }
      };

      socket.onclose = () => {
        console.log("⚠️ WebSocket closed, reconnecting...");
        wsRef.current = null;
        isConnected.current = false;
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        isConnected.current = false;
      }
    };
  }, [user?.email]);

  const sendMessage = () => {
    if (wsRef.current && input.trim()) {
      const messageData = {
        userId: user ? user.email : "Anonymous",
        message: input,
      };
      wsRef.current.send(JSON.stringify(messageData));
      setMessages((prev) => [
        ...prev,
        {
          user: "You",
          message: input,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-6 text-white">
      <div className="w-full max-w-5xl h-[70vh] md:h-[75vh] rounded-2xl bg-slate-950/90 border border-slate-700/70 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-950/80">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Live Chat
            </p>
            <h1 className="text-lg md:text-xl font-semibold text-slate-50">
              JobEcho Community
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Connected</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 chat-window overflow-y-auto px-4 pt-4 pb-3 space-y-3 bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-slate-950">
          {messages.map((msg, index) => {
            const isYou =
              "user" in msg ? msg.user === "You" : msg.sender === user?.email;
            const displayName =
              "user" in msg
                ? msg.user
                : msg.sender
                ? msg.sender
                : "User";

            return (
              <div
                key={index}
                className={`flex ${isYou ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-lg ${
                    isYou
                      ? "bg-sky-500/90 text-white rounded-br-sm"
                      : "bg-slate-800/90 text-slate-50 rounded-bl-sm"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-0.5">
                    <span className="font-semibold text-[12px] uppercase tracking-wide text-slate-200">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-slate-200/70">
                      {msg.time}
                    </span>
                  </div>
                  <p className="leading-relaxed text-[13px] text-slate-50">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs md:text-sm text-slate-400 text-center max-w-xs">
                No messages yet. Start the conversation and share your placement
                or interview experience with the community.
              </p>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/95 border-t border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 rounded-xl bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-sm md:text-[15px] text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400/80 transition-all"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm md:text-[15px] font-medium px-4 md:px-6 py-2.5 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
