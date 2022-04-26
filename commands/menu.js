const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./lib/config.json'))
const { kapitalisasiKata } = require('../lib/tools')
module.exports = {
    name: ['menu'],
    cmd: ['menu'],
    async handler(msg, {conn, from, args}) {
        command = Object.values(global.commands).filter(cmd => cmd.category)
        map_tag = command.map((mek) => mek.category)
        sort_tag = await map_tag.sort()
        tag_data = new Set(sort_tag)
        tags = [...tag_data]
        tmenu = `TelegramBot-Js\n\n`
        tmenu += `📚 Library : node-telegram-bot-api\n`
        tmenu += `⏱️ Runtime : ${await tools.toTimer(process.uptime())}\n\n`
        tmenu += `Halo @${msg.from.username} 👋🏻\nSaya adalah TakaBot, Bot yang dibuat karena Gabut saja.\n\nSilahkan pilih menu dibawah ><`
        if(args[0] != undefined && args[0].startsWith('-')){
            cmde = command.filter(s => s.category == args[0].slice(1))
            if(cmde == '') return
            helps = []
            for(let o of cmde.map(f => f.name)){
                for(let p of o){
                    helps.push(p)
                }
            }
            sort = await helps.sort(function (a, b) {
                return a.length - b.length
            })
            menu = `TelegramBot-Js\n\n`
            menu += `📚 Library : node-telegram-bot-api\n`
            menu += `⏱️ Runtime : ${await tools.toTimer(process.uptime())}\n\n`
            menu += `${global.shp} MENU ${args[0].slice(1).toUpperCase()}\n`
            for(let i=0; i<sort.length; i++){
                menu += `${i+1}.${sort[i]}\n`
            }
            return conn.editMessageCaption(menu, {
                reply_to_message_id: msg.message_id,
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '<< Back',
                                callback_data: `/menu`
                            }
                        ]
                    ]
                }
            })
        }
        const inline = []
        for(let i of tags){
            inline.push([{
                text: await kapitalisasiKata(i),
                callback_data: `/menu -${i}`
            }])
        }
        if(msg.reply_markup == undefined){
            conn.sendPhoto(msg.chat.id, config.image, {
                caption: tmenu,
                reply_to_message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: inline
                }
            })
        }
        else{
            conn.editMessageCaption(tmenu, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: inline
                }
            })
        }
    }
}
