import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import messageRouter from "./routes/messages.js";

// app config
dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT || 8080;

// app middleware
app.use(express.json());
app.use(cors());

// database connection
connectDB();

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));
app.use("/api", messageRouter);

// listener
app.listen(port, console.log(`Listening on localhost:${port}`));
