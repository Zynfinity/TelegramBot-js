import fs from "fs"
import config from '../lib/config.js'
import { kapitalisasiKata, toTimer } from "../lib/tools.js"
export default {
    name: ['menu'],
    cmd: ['menu'],
    async handler(msg, { conn, from, args }) {
        const command = Object.values(global.commands).filter(cmd => cmd.category)
        let map_tag = command.map((mek) => mek.category)
        let sort_tag = await map_tag.sort()
        let tag_data = new Set(sort_tag)
        let tags = [...tag_data]
        let tmenu = `TelegramBot-Js\n\n\n`
        let smenu = `📚 Library : node-telegram-bot-api\n`
        smenu += `⏱️ Runtime : ${await toTimer(process.uptime())}\n\n\n`
        tmenu += smenu
        tmenu += `Halo @${msg.username} 👋🏻\nSaya adalah TakaBot, Bot yang dibuat karena Gabut saja.\n\nSilahkan pilih menu dibawah ><`
        if (args[0] != undefined && args[0].startsWith('-')) {
            let cmde = command.filter(s => s.category == args[0].slice(1))
            if (cmde == '') return
            let helps = []
            for (let o of cmde.map(f => f.name)) {
                for (let p of o) {
                    helps.push(p)
                }
            }
            let sort = await helps.sort(function (a, b) {
                return a.length - b.length
            })
            let menu = `TelegramBot-Js\n\n\n`
            menu += smenu
            menu += `${global.shp} ${args[0].slice(1).toUpperCase()}`
            const inlineMenu = []
            let count = 0
            for (let i = 0; i < sort.length / 3; i++) {
                for (let j = 0; j < 3; j++) {
                    inlineMenu.push([])
                    if (sort[count] != undefined) {
                        inlineMenu[i].push({
                            text: `${sort[count]}`,
                            callback_data: `/help ${sort[count]}`
                        })
                    }
                    count += 1
                }
            }
            return conn.editMessageText(menu, {
                reply_to_message_id: msg.message_id,
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                entities: [
                    { offset: 16, length: smenu.length, type: 'pre', language: 'js' }
                ],
                reply_markup: {
                    inline_keyboard: [...inlineMenu,
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
        for (let i of tags) {
            inline.push([{
                text: await kapitalisasiKata(i),
                callback_data: `/menu -${i}`
            }])
        }
        if (msg.reply_markup == undefined) {
            conn.sendMessage(msg.chat.id, tmenu, {
                reply_to_message_id: msg.message_id,
                entities: [
                    { offset: 16, length: smenu.length, type: 'pre', language: 'js' }
                ],
                reply_markup: {
                    inline_keyboard: inline
                }

            })
        }
        else {
            conn.editMessageText(tmenu, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                entities: [
                    { offset: 16, length: smenu.length, type: 'pre', language: 'js' }
                ],
                reply_markup: {
                    inline_keyboard: inline
                }
            })
        }
    }
}
