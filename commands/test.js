const request = require('request')
module.exports = {
    name: ['alive'],
    cmd: ['alive'],
    async handler(msg, {conn}) {
        conn.sendMessage(msg.chat.id, `Halo, im alive`)
        audio = await tools.getBuffer('https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg')
        console.log(audio)
        conn.sendAudio(msg.chat.id, audio)
    }
}
