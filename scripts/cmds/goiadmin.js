module.exports = {
  config: {
    name: "goiadmin",
    author: "yazky", // ninakaw ni jay
    role: 0,
    shortDescription: "bawal sa bading",
    longDescription: "Gwapo si jay",
    category: "admin",
    guide: "{pn}"
  },
  onChat: async function ({ api, event }) {
    if (event.senderID !== "100045526235882" && event.senderID !== "100065924006832") {
      var aid = ["100045526235882", "100065924006832"];
      for (const id of aid) {
        if (Object.keys(event.mentions).includes(id)) {
          var msg = [
            "Don't tag admin, nag bebe time Yun!",
            "Admin is currently busy 😌",
            "Sorry, my handsome admin is busy",
            "ano kailangan mo sa pogi kong admin? 😤",
            "What do you want to my admin⁉️"
          ];
          api.setMessageReaction("❔", event.messageID, (err) => {}, true);
          return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
        }
      }
    }
  },
  onStart: async function ({ api, event, args }) {
    api.sendMessage("Goiadmin command with sarscam reasons.", event.threadID, event.messageID);
  }
};
