import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http"
import { Server } from "socket.io"
import authRoutes from "./routes/auth.js"

import userRoutes from "./routes/user.js"
import eventRoutes from "./routes/eventRoutes.js";
import path, { dirname } from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
})

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
  
app.use("/api/auth", authRoutes)


app.use("/api/events", eventRoutes);

app.use("/api/users", userRoutes)
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get('*', (_, res) => {
 res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));

})
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

