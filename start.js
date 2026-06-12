process.env.NODE_ENV = "production";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import "./server.js";
