const request = require('request')
const { kapitalisasiKata } = require('../../zxbot/lib/tools')
module.exports = {
    name: ['menu'],
    cmd: ['menu'],
    async handler(msg, {conn, from, args}) {
        command = Object.values(global.commands).filter(cmd => cmd.category)
        map_tag = command.map((mek) => mek.category)
        sort_tag = await map_tag.sort()
        tag_data = new Set(sort_tag)
        tags = [...tag_data]
        if(args[0] != undefined && args[0].startsWith('-')){
            cmde = command.filter(s => s.category == args[0].slice(1))
            if(cmde == '') return
            menu = `MENU ${args[0].slice(1).toUpperCase()}\n\n`
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
            inline.push({
                text: await kapitalisasiKata(i),
                callback_data: `/menu -${i}`
            })
        }
        if(msg.reply_markup == undefined){
            conn.sendMessage(msg.chat.id, `Halo @${msg.from.username} 👋🏻\nSaya adalah TakaBot, Bot yang dibuat karena Gabut saja.\n\nSilahkan pilih menu dibawah ><`, {
                reply_markup: {
                    inline_keyboard: [
                        inline
                    ]
                }
            })
        }
        else{
            conn.editMessageText(`Halo @${msg.from.username} 👋🏻\nSaya adalah TakaBot, Bot yang dibuat karena Gabut saja.\n\nSilahkan pilih menu dibawah ><`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        inline
                    ]
                }
            })
        }
    }
}
