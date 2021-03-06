const yts = require('yt-search')
module.exports = {
    name: ['play <query>'],
    cmd: ['play'],
    category: 'downloader',
    wait: true,
    async handler(msg, {conn, from, text}) {
        try{
            if(!text) return conn.reply(msg, await miss('query'))
            const yt = await yts(text)
            const filter = yt.all.find(s => s.type == 'video' && s.url)
            ingfo = await yts({videoId: filter.videoId})
            ingfo.author_name = ingfo.author.name
            ingfo.channel = ingfo.author.url
            await conn.sendPhoto(from, ingfo.image, {
                reply_to_message_id: msg.message_id,
                caption: await tools.parseResult('PLAY', ingfo, {delete: ['description', 'image', 'thumbnail', 'author']}),
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Audio',
                                callback_data: `/ytmp3 ${ingfo.url}`
                            },
                            {
                                text: 'Video',
                                callback_data: `/ytmp4 ${ingfo.url}`
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
