import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Chat: React.FC = () => {
  const user = useSelector((state: RootState) => state.appSlice.user) as { email: string } | null;
  console.log(user);
  const [messages, setMessages] = useState<{ user: string; message: string; time: string }[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (isConnected.current) return; 

    const connectWebSocket = () => {
      const socket = new WebSocket("ws://localhost:3000");
      wsRef.current = socket;
      isConnected.current = true;

      socket.onopen = () => console.log("✅ WebSocket connected");

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prev) => [
            ...prev,
            { user: message.userId, message: message.message, time: new Date().toLocaleTimeString() },
          ]);
        } catch (error) {
          console.error("❌ Error parsing WebSocket message", error);
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
  }, []);

  const sendMessage = () => {
    if (wsRef.current && input.trim()) {
      const messageData = { userId: user ? user.email : "Anonymous", message: input };
      wsRef.current.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, { user: "You", message: input, time: new Date().toLocaleTimeString() }]);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user === "You" ? "sent" : "received"}`}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
