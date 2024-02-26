import util from "util"
import { webtoons } from "../lib/scraper.js"
export default {
    name: ['ev'],
    cmd: ['ev', 'eval'],
    category: 'owner',
    owner: true,
    async handler(msg, { conn, text }) {
        try {
            console.log("E V A L")
            let evaled = await eval(text)
            if (typeof evaled !== 'string') evaled = util.inspect(evaled)
            await conn.reply(msg, evaled)
        } catch (e) {
            await conn.reply(msg, String(e))
        }
    }
}
