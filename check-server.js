#!/usr/bin/env node

// Script to check if the server is accessible on the specified IP and port
import http from "http";

const HOST = process.env.HOST || "13.204.47.235";
const PORT = process.env.PORT || 3000;

console.log(`Checking if server is accessible at http://${HOST}:${PORT}...`);

const req = http.request(
  {
    host: HOST,
    port: PORT,
    path: "/",
    method: "GET",
    timeout: 5000, // 5 seconds timeout
  },
  (res) => {
    console.log(`Server responded with status code: ${res.statusCode}`);

    if (res.statusCode >= 200 && res.statusCode < 400) {
      console.log("✅ Server is accessible!");
    } else {
      console.log("⚠️ Server responded with an error status code.");
    }

    res.on("data", () => {});
    res.on("end", () => {
      process.exit(0);
    });
  }
);

req.on("error", (error) => {
  console.error("❌ Error connecting to server:");
  console.error(error.message);

  if (error.code === "ECONNREFUSED") {
    console.log("\nPossible reasons:");
    console.log("1. The server is not running");
    console.log("2. The server is running but not on the specified port");
    console.log("3. A firewall is blocking the connection");
    console.log("\nTroubleshooting steps:");
    console.log("1. Check if the server is running: pm2 list");
    console.log("2. Check server logs: pm2 logs portfolio");
    console.log(
      "3. Check if the port is open: sudo netstat -tulpn | grep 3000"
    );
    console.log("4. Check firewall status: sudo ufw status");
  } else if (error.code === "ETIMEDOUT") {
    console.log("\nPossible reasons:");
    console.log("1. The server IP address is incorrect");
    console.log("2. Network connectivity issues");
    console.log("3. A firewall is blocking the connection");
  }

  process.exit(1);
});

req.on("timeout", () => {
  console.error("❌ Connection timed out");
  console.log("\nPossible reasons:");
  console.log("1. The server is not responding");
  console.log("2. Network latency issues");
  console.log("3. The server is overloaded");
  req.destroy();
  process.exit(1);
});

req.end();
