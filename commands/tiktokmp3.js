const request = require('request')
module.exports = {
    name: ['tiktokmusic  <link>'],
    cmd: ['tiktokmusic', 'tiktokmp3'],
    category: 'downloader',
    wait: true,
    async handler(msg, {conn, from, text}) {
        try{
            if(!text) return conn.reply(msg, await miss('url'))
            if(!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            const tiktok = await scrapp.musicaldown(text)
            if(!tiktsok.status) return conn.reply(msg, tiktok)
            audio = await tools.getBuffer(tiktok.audio.link3 == undefined ? tiktok.audio.link1 : tiktok.audio.link3)
            conn.sendAudio(msg.id, audio)
        }catch(e){
            errormes(e, msg)
        }
    }
}
