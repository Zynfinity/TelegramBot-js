const tools = require("../lib/tools")

module.exports = {
    name: ['ytmp3', 'ytmp4'].map((v) => v + ' <link>'),
    cmd: ['ytmp3', 'ytmp4'],
    category: 'downloader',
    wait: true,
    async handler(msg, {conn, from, text}) {
        try{
            if(!text) return conn.reply(msg, await miss('url'))
            if(!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            res = await scrapp.youtube(text)
                if(!res.status) return conn.reply(msg, res)
                ytcap = `${msg.command == 'ytmp3' ? 'YTMP3 DOWNLOADER' : 'YTMP4 DOWNLOADER'}\n\n`
                ytcap += `${global.shp} Id : ${res.id}\n`
                ytcap += `${global.shp} Title : ${res.title}\n`
                ytcap += `${global.shp} Size : ${msg.command == 'ytmp3' ? res.size_mp3 : res.size}\n\n`
                ytcap += `Wait a minute, media is being sent...`
                if(msg.reply_markup == undefined) await conn.sendPhoto(from, res.thumb, {caption: ytcap, reply_to_message_id: msg.message_id})
                const media = await tools.getBuffer(msg.command == 'ytmp3' ? res.mp3 : res.link)
                    if(msg.command == 'ytmp3') await conn.sendAudio(from, media, {reply_to_message_id: msg.message_id}, {filename: res.title})
                    else await conn.sendVideo(from, media, {reply_to_message_id: msg.message_id})
        }catch(e){
            errormes(e, msg)
        }
    }
}
