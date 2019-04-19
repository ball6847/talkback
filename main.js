const talkback = require("talkback");

const opts = {
  host: "https://irpc-web-dashboard-dev.azurewebsites.net",
  record: talkback.Options.RecordMode.NEW,
  port: 5544,
  path: "./my-tapes"
};
const server = talkback(opts);
server.start(() => console.log("Talkback Started"));
//server.close();
