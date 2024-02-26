import TelegramBot from "node-telegram-bot-api";
import cors from "cors";
import { Token } from "./config.js";
import Express from "express";
import chokidar from "chokidar"
import BotRouter from "./router/BotRouter.js";
import { api, connect } from "./config/db.js";
import morgan from "morgan";
import handler from "./src/lib/handler.js"
global.conn = {};
global.commands = {};
global.shp = ">"
const app = Express();
app.use(cors({ origin: ["http://localhost:3000", "http://192.168.64.149:3000"] }));
app.use(Express.json());
app.use(Express.urlencoded());
app.use(morgan('dev'));
app.use(BotRouter)
async function Start() {
  global.db = await connect()
  app.listen(8000, async () => {
    console.log("Server listening on port 8000");
  });
  const bot = new TelegramBot(Token, { polling: true });
  bot.on("message", async (msg) => {
    handler(bot, msg)
  });
  bot.on('callback_query', function onCallbackQuery(query) {
    bot.answerCallbackQuery(query.id)
    // bot.answerCallbackQuery(query.id, {text: 'test', show_alert: true});
    const action = query.data;
    const msg = query.message;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    handler(bot, msg, action, msg)
  });
  // bot.on('inline_query', query => {
  //   const inlineQueryId = query.id
  //   bot.answerInlineQuery(inlineQueryId, [
  //     {
  //       type: 'article',
  //       id: '1',
  //       title: 'asui',
  //       input_message_content: {
  //         message_text: 'asu'
  //       }
  //     }
  //   ])
  // })
  bot.on("polling_error", (error) => {
    console.log(error.response); // => 'EFATAL'
  });
}
var watcher = chokidar.watch('./src/commands', { ignored: /^\./, persistent: true });
watcher
  .on('error', function (error) { console.error('Error happened', error); })
  .on('add', async function (pathh) {
    const path = pathh.split(pathh.includes('/') ? '/' : "\\")
    const file = path[path.length - 1]
    console.log({ file, pathh })
    global.commands[file] = (await import('./' + pathh)).default
  })
  .on('change', async function (pathh) {
    const reload = (await import(`./${pathh}?update=${Date.now()}`)).default
    const path = pathh.split(pathh.includes('/') ? '/' : "\\")
    const file = path[path.length - 1]
    console.log(`${file} Updated`)
    global.commands[file] = reload
  })
  .on('unlink', function (pathh) {
    const path = pathh.split(pathh.includes('/') ? '/' : "\\")
    const file = path[path.length - 1]
    console.log(`deleted plugin ${file}`)
    delete global.commands[file]
  })
Start()