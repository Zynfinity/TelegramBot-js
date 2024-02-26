import { tikdown } from "../lib/scraper.js"
import { getBuffer } from "../lib/tools.js"

export default {
    name: ['tiktok'],
    cmd: ['tiktok', 'tiktoknowm'],
    param: ['<link>'],
    category: 'downloader',
    wait: true,
    async handler(msg, { conn, from, text }) {
        try {
            if (!text) return conn.reply(msg, await miss('url'))
            if (!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            const tiktok = await tikdown(text)
            console.log(tiktok)
            if (!tiktok.status) return conn.reply(msg, tiktok)
            const video = await getBuffer(tiktok.video)
            await conn.sendVideo(from, video, {
                reply_to_message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Tiktok Music',
                                callback_data: `/tiktokmusic ${tiktok.audio.split('org-')[1]} |direct`
                            }
                        ]
                    ]
                }
            })
        } catch (e) {
            errormes(e, msg)
        }
    }
}
