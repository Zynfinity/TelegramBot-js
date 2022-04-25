const request = require('request')
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
            menu = `TelegramBot-Js\n\n`
            menu += `📚 Library : node-telegram-bot-api\n`
            menu += `⏱️ Runtime : ${await tools.toTimer(process.uptime())}\n\n`
            menu += `${global.shp} MENU ${args[0].slice(1).toUpperCase()}\n`
            for(let i=0; i<cmde.length; i++){
                menu += `${i+1}.${cmde[i].name}\n`
            }
            return conn.editMessageText(menu, {
                reply_to_message_id: msg.message_id,
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Back',
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
            conn.sendMessage(msg.chat.id, tmenu, {
                reply_to_message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: inline
                }
            })
        }
        else{
            conn.editMessageText(tmenu, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: inline
                }
            })
        }
    }
}
