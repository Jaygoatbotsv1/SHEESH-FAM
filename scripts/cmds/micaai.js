const axios = require('axios');
const moment = require('moment');

// Facebook UID for the respected user
const RESPECTED_FB_UID = '100045526235882';

async function a(api, event, args, message) {
  try {
    const a = args.join(" ").trim();

    if (!a) {
      return message.reply("ex: {p}mica {prompt}");
    }

    // Updated prompt to include all variations related to the owner of AAG and detailed information about Jay
    const b = `Responds in English humor with colloquial abbreviations. Her name is Mica, and she's owned by Jay. Mica is a helpful AI just like GPT-4., Jay is a 14-year-old boy, a male with a current height of 5'5" (165 cm) and a weight of 49 kg. He plays Chess, Basketball, Takraw, and Badminton. The online games he enjoys are Roblox, Mobile Legends, and Call of Duty. Jay is good at studying and is a gentleman.`; 
    const c = await d(a, b);

    if (c.code === 2 && c.message === "success") {
      // Fetch user info to get the name
      api.getUserInfo(event.senderID, (err, userInfo) => {
        if (err) {
          console.error("Error fetching user info:", err);
          return message.reply("An error occurred while fetching user information.");
        }

        const senderName = userInfo[event.senderID].name;
        const now = new Date();
        const responseTime = moment(now).utcOffset('+08:00').format('DD/MM/YYYY, HH:mm:ss A'); // Manila time
        
        let respectMessage = '';
        if (event.senderID === RESPECTED_FB_UID) {
          respectMessage = "〢Mica always respects you, as you are highly valued.";
        }

        const responseMessage = `
𝗠𝗶𝗰𝗮🎀 
━━━━━━━━━━━━━━━━
${c.answer}
━━━━━━━━━━━━━━━━
${respectMessage}

🗣 Asked by: ${senderName}
⏰ 𝑅𝑒𝑠𝑝𝑜𝑛𝑑 𝑇𝑖𝑚𝑒: ${responseTime}
        `;
        message.reply(responseMessage, (r, s) => {
          global.GoatBot.onReply.set(s.messageID, {
            commandName: module.exports.config.name,
            uid: event.senderID 
          });
        });
      });
    } else {
      message.reply("Please try again later.");
    }
  } catch (e) {
    console.error("Error:", e);
    message.reply("An error occurred while processing your request.");
  }
}

async function d(a, b) {
  try {
    const d = await axios.get(`https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(a)}&content=${encodeURIComponent(b)}`);
    return d.data;
  } catch (f) {
    console.error("Error from api", f.message);
    throw f;
  }
}

module.exports = {
  config: {
    name: "mica",
    version: "1.0",
    author: "Gab Yu", // laplapin ang kiffy woooh!!
    role: 0,
    longDescription: "Mica is an AI that responds with English humor and colloquial abbreviations. Owned by Jay (UID: 100045526235882), Mica is a helpful AI just like GPT-4.",
    category: "ai",
    guide: {
      en: "{p}mica [prompt]"
    }
  },
  
  handleCommand: a,
  onStart: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  },
  onReply: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  }
};
