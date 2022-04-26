const request = require('request')
module.exports = {
    name: ['tiktok <link>'],
    cmd: ['tiktok', 'tiktoknowm'],
    category: 'downloader',
    wait: true,
    async handler(msg, {conn, from, text}) {
        try{
            if(!text) return conn.reply(msg, await miss('url'))
            if(!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            const tiktok = await scrapp.tikdown(text)
            if(!tiktok.status) return conn.reply(msg, tiktok)
            audio = await tools.getBuffer(tiktok.video)
            await conn.sendVideo(from, audio, {
                reply_to_message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Tiktok Music',
                                callback_data: `/tiktokmusic ${text}`
                            }
                        ]
                    ]
                }
            })
        }catch(e){
            errormes(e, msg)
        }
    }
}
