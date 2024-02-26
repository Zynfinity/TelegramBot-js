import { youtube } from '../lib/scraper.js'
import { getBuffer } from '../lib/tools.js'

export default {
    name: ['ytmp3', 'ytmp4'],
    cmd: ['ytmp3', 'ytmp4'],
    param: ['<link>', '<link>'],
    category: 'downloader',
    wait: true,
    async handler(msg, { conn, from, text }) {
        try {
            if (!text) return conn.reply(msg, await miss('url'))
            if (!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            let res = await youtube(text, msg.command == "ytmp4" ? "mp4" : "mp3")
            if (!res.status) return conn.reply(msg, res)
            let ytcap = `${msg.command == 'ytmp3' ? 'YTMP3 DOWNLOADER' : 'YTMP4 DOWNLOADER'}\n\n`
            ytcap += `${global.shp} Id : ${res.id}\n`
            ytcap += `${global.shp} Title : ${res.title}\n`
            ytcap += `${global.shp} Size : ${res.size}\n\n`
            ytcap += `Wait a minute, media is being sent...`
            if (msg.reply_markup == undefined) await conn.sendPhoto(from, res.thumb, { caption: ytcap, reply_to_message_id: msg.message_id })
            const media = await getBuffer(res.link)
            if (msg.command == 'ytmp3') await conn.sendAudio(from, media, { reply_to_message_id: msg.message_id }, { filename: res.title })
            else await conn.sendVideo(from, media, { reply_to_message_id: msg.message_id })
        } catch (e) {
            errormes(e, msg)
        }
    }
}
