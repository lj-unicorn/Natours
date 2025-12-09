import app from "./app.js";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  throw err;
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

let server;

mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 5000, // fail fast on server selection
    socketTimeoutMS: 45000, // 45 seconds for actual queries
    maxPoolSize: 10,
    minPoolSize: 5,
    bufferCommands: false, // don't buffer commands while connecting
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log(`DB connection successful`);

    // Start server only after DB is connected
    const port = process.env.PORT || 8000;
    server = app.listen(port, "0.0.0.0", () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.error("Failed to connect to database. Exiting...");
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  });

// Connection event listeners for monitoring
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected! Attempting to reconnect...");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error during runtime:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.log("Unhandled rejection! Shutting down...");
  server.close(() => {
    throw err;
  });
});
