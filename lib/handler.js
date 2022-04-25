const fs = require('fs')
const lang = require('./mess')
const moment = require('moment-timezone')
const config = JSON.parse(fs.readFileSync('./lib/config.json'))
const rzkyclient = require('rzkyfdlh-api')
module.exports = {
  async handler(conn, msg, action, callback){
    require('./func/func')(conn, msg)
    global.rzky = new rzkyclient('1ibl8r4kz37x4to6h8r3uxl472o88bmvg49822xd8779q31bck')
    global.scrapp = require('./scraper')
    global.tools = require('./tools')
    global.errormes = async(e, m) => {
      conn.sendMessage(m.id, `Id\nFitur Error, mungkin akan segera diperbaiki\n\nEn\nFeature error, maybe it will be fixed soon`)
    }
    global.mess = {
      wait: `Id\n${lang.id.wait}\n\nEn\n${lang.en.wait}`,
      errorlink: `Id\n${lang.id.errorlink}\n\nEn\n${lang.en.errorlink}`
    }
    const failm = {
      owner: `Id\n${lang.id.isowner}\n\nEn\n${lang.en.isowner}`
    }
    async function fail(fel, m){
      conn.reply(m, failm[fel])
    }
    global.miss = async(parameter) => {
      console.log(parameter)
      return(`Enter ${parameter} parameters!`)
    }
    const chats = action || msg.text || msg.caption || ''
    const command = chats.split(' ')[0].slice(1)
		const args = chats.trim().split(/ +/).slice(1);
    const q = args.join(" ")
    const isOwner = msg.from.id == config.owner ? true : false
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
    if(cmd.owner && !isOwner) return fail('owner')
    console.log(moment.tz("Asia/Jakarta").format("DD/MM/YY HH:mm:ss") + " : from: " + msg.from.username + " chat: " + command);
    try{
      if(cmd.wait){
        conn.reply(msg, mess.wait).then(async wet => {
          await cmd.handler(msg, extra)
          await tools.sleep(4000)
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
