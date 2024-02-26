import TelegramBot from "node-telegram-bot-api";
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function addBot(name, token, db, api) {
  const cek = (await db.query(api.BotData.listBot)).find(q => q.token == token || q.name == name)
  if (cek) return ({ status: 404, message: "Nama / Token telah terdaftar sebelumnya!" });
  await db.mutation(api.BotData.newBot, { name: name, token: token })
  return ({ status: 200, message: "Bot Successfully Connected" });
}
async function deleteBot(name, db, api) {
  const cek = (await db.query(api.BotData.listBot)).find(q => q.name == name)
  if (cek) {
    const del = await db.mutation(api.BotData.deleteBot, { id: cek._id })
    return ({ status: 200, message: 'Bot berhasil dihapus!' })
  }
  else return ({ status: 404, message: 'Bot tidak terdaftar!' })
}

async function connectBot(name, db, api) {
  return new Promise(async (resolve, reject) => {
    const find = (await db.query(api.BotData.listBot)).find(q => q.name == name)
    if (!find || find == undefined) return resolve({ status: 404, message: 'bot not found!' })
    conn[name] = new TelegramBot(find.token, { polling: true });
    conn[name].on("message", (msg) => {
      const chatId = msg.chat.id;
      console.log(msg);
      conn[name].sendMessage(chatId, "Received your message");
    });
    conn[name].on("polling_error", (error) => {
      if (error.response && error.response.statusCode && (error.response.statusCode == 401 || error.response.statusCode == 404)) {
        console.log("error");
        conn[name].stopPolling();
        delete conn[name];
        reject(`Authentication error for bot ${name}`);
      }
    });
    await sleep(3000);
    resolve({ status: 200, message: "Bot Successfully Connected" });
  });
}
export { addBot, deleteBot, connectBot };
