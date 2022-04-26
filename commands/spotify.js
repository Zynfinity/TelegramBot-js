const spotifydlCore = require("spotifydl-core").default
const credential = {
    clientId: '271f6e790fb943cdb34679a4adcc34cc',
    clientSecret: 'c009525564304209b7d8b705c28fd294'
}
const spotify = new spotifydlCore(credential)
module.exports = {
    name: ['spotify <query>', 'spotifydl <link>'],
    cmd: ['spotify', 'spotifydl'],
    category: 'downloader',
    wait: true,
    async handler(msg, {conn, from, text}){
        try{
        if(msg.command == 'spotify'){
            if(!text) return conn.reply(msg, await miss('query'))
            scrapp.spotifysearch(text).then(async res => {
                if(!res.status) return conn.reply(msg, res)
                res['artis'] = res.artist.map(s => s.name).join(' && ')
                await conn.sendPhoto(msg.id, res.thumbnail, {reply_to_message_id: msg.message_id, caption: await tools.parseResult('SPOTIFY', res, {delete: ['thumbnail', 'artist', 'status']})})
                spotify.downloadTrack(res.track).then(async res => {
                    await conn.sendAudio(msg.id, res, {reply_to_message_id: msg.message_id})
                })
            })
        }
        else{
            if(!text) return conn.reply(msg, await miss('url'))
            if(!msg.isUrl(text)) return conn.reply(msg, mess.errorlink)
            if(!/spotify|track/.test(text)) return conn.reply(msg, {status: false, message: 'Cek your link!'})
            spotify.downloadTrack(text).then(async res => {
                await conn.sendAudio(msg.id, res, {reply_to_message_id: msg.message_id})
            })
        }
        }catch(e){
            errormes(e, msg)
        }
    }
}