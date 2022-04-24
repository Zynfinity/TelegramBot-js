const request = require('request')
module.exports = {
    name: ['start'],
    cmd: ['start'],
    async handler(msg, {conn}) {
        conn.sendMessage(msg.id, `Halo, Saya adalah TakaBot\nBot yang dibuat karena Gabut saja`, {
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
