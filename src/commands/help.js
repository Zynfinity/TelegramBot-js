import { parseResult } from "../lib/tools.js"

export default {
    name: 'help',
    cmd: ['help'],
    async handler(msg, { conn, from, args }) {
        const cmd = await Object.values(global.commands).find(cdm => !cdm.function && cdm.cmd.includes(args[0]))
        let detail = 'DETAIL COMMAND'
        let detail2 = `Name: ${cmd.name},\n`
        detail2 += `Cmd: ${cmd.cmd},\n`
        detail2 += `Param: ${cmd.param ? cmd.param : 'Null'},\n`
        detail2 += `Category: ${cmd.category}\n`
        detail += detail2
        await conn.editMessageText(detail, {
            reply_to_message_id: msg.message_id,
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            entities: [
                { offset: 14, length: detail2.length, type: 'pre', language: 'js' }
            ],
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '<< Back',
                            callback_data: `/menu -${cmd.category}`
                        }
                    ]
                ]
            }
        })
    }
}