import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { UserAuthRouter } from "./routes/UserAuthRouter";
import cookieParser from "cookie-parser";
import { dbConnect } from "./dbConnect";
import CompanyRouter from "./routes/CompanyRoutes";
import ExperienceRouter from "./routes/ExperienceRouter";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173,https://job-echo-dusky.vercel.app/" }));  
config();

// Routes
app.use("/user", UserAuthRouter);
app.use("/company", CompanyRouter);
app.use("/experience", ExperienceRouter);

// Create HTTP server and WebSocket server on the same port
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let clients = new Set();

wss.on("connection", (ws: any) => {
    console.log("New WebSocket client connected");
    clients.add(ws);

    ws.on("message", (message: string) => {
        try {
            const data = JSON.parse(message);
            console.log("Received:", data);

            // Broadcast message to all clients except sender
            clients.forEach((client:any) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    });

    ws.on("close", () => {
        console.log("WebSocket client disconnected");
        clients.delete(ws);
    });
});

dbConnect(); // Connect to the database

// Start server (HTTP + WebSocket)
server.listen(3000, () => {
    console.log("Server (HTTP & WebSocket) is running at http://localhost:3000");
});
