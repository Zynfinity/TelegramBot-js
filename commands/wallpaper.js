module.exports = {
    name: ['wallpaper <query>'],
    cmd: ['wallpaper', 'wp'],
    category: 'search',
    wait: true,
    async handler(msg, {conn, text}) {
        try{
            if(!text) return conn.reply(msg, 'Mau cari apa?')
            const peak = await scrapp.peakpx(text)
            rand = peak[Math.floor(Math.random() * peak.length)]
            await conn.sendPhoto(msg.id, rand.image, {reply_to_message_id: msg.message_id, caption: await tools.parseResult('Wallpaper', rand)})
        }catch(e){
            errormes(e, msg)
        }
    }
}