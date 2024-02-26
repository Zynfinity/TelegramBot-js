import fs from "fs"
import config from '../lib/config.js'
export default {
    name: ['start'],
    cmd: ['start'],
    async handler(msg, { conn }) {
        conn.sendPhoto(msg.id, config.image, {
            caption: `Halo, Saya adalah TakaBot\nBot yang dibuat karena Gabut saja`,
            reply_to_message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Menu',
                            callback_data: '/menu'
                        }
                    ]
                ]
            }
        })
    }
}
