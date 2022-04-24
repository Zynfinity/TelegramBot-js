const fs = require('fs')
const lang = require('./mess')
const moment = require('moment-timezone')
module.exports = {
  async handler(conn, msg, action, callback){
    require('./func/func')(conn, msg)
    global.scrapp = require('../lib/scraper')
    global.tools = require('../lib/tools')
    global.errormes = async(e, m) => {
      conn.sendMessage(m.id, `Id\nFitur Error, mungkin akan segera diperbaiki\n\nEn\nFeature error, maybe it will be fixed soon`)
    }
    global.mess = {
      wait: `Id\n${lang.id.wait}\n\nEn\n${lang.en.wait}`,
      errorlink: `Id\n${lang.id.errorlink}\n\nEn\n${lang.en.errorlink}`
    }
    global.miss = async(parameter) => {
      console.log(parameter)
      return(`Enter ${parameter} parameters!`)
    }
    const chats = action || msg.text || msg.caption
    const command = chats.split(' ')[0].slice(1)
		const args = chats.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    msg.command = command
    const extra = {
      text: q,
      callback,
      from: msg.id,
      args,
      command,
      conn
    }
    cmd = await Object.values(global.commands).find(cdm => cdm.cmd.includes(command))
    if(cmd == undefined) return console.log('Command not found')
    console.log(moment.tz("Asia/Jakarta").format("DD/MM/YY HH:mm:ss") + " : from: " + msg.from.username + " chat: " + command);
    try{
      if(cmd.wait){
        conn.reply(msg, mess.wait).then(async wet => {
          await cmd.handler(msg, extra)
          conn.deleteMessage(wet.chat.id, wet.message_id)
        })
      }
      else await cmd.handler(msg, extra)
    }catch(e){
      conn.sendMessage(msg.chat.id, String(e))
    }
  }
}
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'handler.js'");
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});