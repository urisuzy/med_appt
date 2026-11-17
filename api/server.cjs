/**
 * Minimal registration / authentication service used for the cURL transcripts
 * required by the capstone (artefacts/register and artefacts/login).
 *
 *   node api/server.js            # listens on http://localhost:5000
 *
 * It keeps users in memory only; restarting the process clears the store.
 */
const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 5001;
const users = new Map();

const send = (res, status, payload) => {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) reject(new Error("Payload too large"));
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/register") {
    try {
      const body = await readBody(req);
      const { name, email, password, phone, role = "patient" } = body;

      if (!name || !email || !password) {
        return send(res, 400, { message: "name, email and password are required" });
      }
      if (users.has(email)) {
        return send(res, 409, { message: "An account with this email already exists" });
      }

      const token = crypto.randomBytes(16).toString("hex");
      users.set(email, { name, email, phone, password, role, token });
      return send(res, 200, { message: "User registered successfully", token, user: { name, email, phone, role } });
    } catch (error) {
      return send(res, 400, { message: error.message });
    }
  }

  if (req.method === "POST" && req.url === "/login") {
    try {
      const { email, password } = await readBody(req);
      const user = users.get(email);
      if (!user || user.password !== password) {
        return send(res, 401, { message: "Invalid email or password" });
      }
      return send(res, 200, { message: "Login successful", token: user.token, user: { name: user.name, email: user.email } });
    } catch (error) {
      return send(res, 400, { message: error.message });
    }
  }

  send(res, 404, { message: "Not found" });
});

server.listen(PORT, () => {
  console.log(`StayHealthy auth API listening on http://localhost:${PORT}`);
});
