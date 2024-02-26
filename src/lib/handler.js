import fs from "fs"
import moment from "moment-timezone"
import lang from './mess.js'
import func from "./function/func.js"
import config from "./config.js"
import { sleep } from "./tools.js"
export default async function handler(conn, msg, action, callback) {
  // async handler(conn, msg, action, callback) {
  func(conn, msg)
  global.errormes = async (e, m) => {
    const send = await conn.sendMessage(m.id, `Id\n${m.command} Error, mungkin akan segera diperbaiki\n\nEn\n${m.command} error, maybe it will be fixed soon\n\nError Log\n${String(e)}`)
    await sleep(10000)
    await conn.deleteMessage(send.chat.id, send.message_id)
  }
  global.mess = {
    wait: `Id\n${lang.id.wait}\n\nEn\n${lang.en.wait}`,
    errorlink: `Id\n${lang.id.errorlink}\n\nEn\n${lang.en.errorlink}`
  }
  const failm = {
    owner: `Id\n${lang.id.isowner}\n\nEn\n${lang.en.isowner}`
  }
  async function fail(fel, m) {
    conn.reply(m, failm[fel])
  }
  global.miss = async (parameter) => {
    console.log(parameter)
    return (`Enter ${parameter} parameters!`)
  }
  const chats = action || msg.text || msg.caption || ''
  const command = chats.split(' ')[0].slice(1)
  const args = chats.trim().split(/ +/).slice(1);
  const q = args.join(" ")
  const isOwner = msg.from.id == config.owner ? true : false
  if (!isOwner && !(msg.from.id == (await conn.getMe()).id)) return console.log('p')
  msg.command = command
  const extra = {
    text: q,
    chats,
    isOwner,
    callback,
    from: msg.id,
    args,
    command,
    conn
  }
  const cmd = await Object.values(global.commands).find(cdm => !cdm.function && cdm.cmd.includes(command))
  if (cmd == undefined) return console.log(command)
  if (cmd.owner && !isOwner) return fail('owner')
  console.log(moment.tz("Asia/Jakarta").format("DD/MM/YY HH:mm:ss") + " : from: " + msg.from.username + " chat: " + command);
  try {
    if (cmd.wait) {
      conn.reply(msg, mess.wait).then(async wet => {
        await cmd.handler(msg, extra)
        await sleep(4000)
        conn.deleteMessage(wet.chat.id, wet.message_id)
      })
    }
    else await cmd.handler(msg, extra)
  } catch (e) {
    conn.sendMessage(msg.chat.id, String(e))
  }
}
// }
