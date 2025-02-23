import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Chat: React.FC = () => {
  const user = useSelector((state: RootState) => state.appSlice.user) as {
    email: string;
  } | null;
  console.log(user);
  const [messages, setMessages] = useState<
    { user: string; message: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (wsRef.current) return;
    const connectWebSocket = () => {
      const socket = new WebSocket("ws://localhost:3000");
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
        { user: "You", message: input, time: new Date().toLocaleTimeString() },
      ]);
      setInput("");
    }
  };

  return (
    <div className="chat-container flex flex-col h-[40vw] p-6 bg-black text-white w-[50vw]">
      <div className="chat-window flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.user === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-2xl ${
                msg.user === "You"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-800 text-white self-start"
              }`}
            >
              <strong>{msg.user}:</strong> {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-3 bg-gray-900 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 rounded-lg bg-gray-700 text-white outline-none w-full text-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-8 py-4 bg-blue-500 text-white rounded-lg text-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
