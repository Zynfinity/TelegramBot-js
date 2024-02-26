import { musicaldown } from "../lib/scraper.js"
import { getBuffer } from "../lib/tools.js"

export default {
    name: ['tiktokmusic'],
    cmd: ['tiktokmusic', 'tiktokmp3'],
    param: ['<link>'],
    category: 'downloader',
    wait: true,
    async handler(msg, { conn, from, text }) {
        try {
            if (!text) return conn.reply(msg, await miss('url'))
            if (!msg.isUrl(text) && !text.includes('|direct')) return conn.reply(msg, mess.errorlink)
            if (text.includes('|direct')) {
                const url = `https://vid.tikdown.org/api.php?download=tikdown.org-${text.split('|')[0]}`
                console.log(url)
                const audio = await getBuffer(url)
                return await conn.sendAudio(msg.id, audio)
            }
            const tiktok = await musicaldown(text)
            if (!tiktok.status) return conn.reply(msg, tiktok)
            const audio = await getBuffer(tiktok.audio.link3 == undefined ? tiktok.audio.link1 : tiktok.audio.link3)
            await conn.sendAudio(msg.id, audio, { reply_to_message_id: msg.message_id })
        } catch (e) {
            errormes(e, msg)
        }
    }
}
