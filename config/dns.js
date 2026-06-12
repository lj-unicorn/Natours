import dns from "node:dns";

// Force stable public resolvers (bypass Windows ICS / DNS bugs)
dns.setServers([
  "1.1.1.1", // Cloudflare (fast + reliable)
  "8.8.8.8", // Google fallback
]);