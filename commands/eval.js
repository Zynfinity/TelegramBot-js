const util = require('util')
module.exports = {
    name: ['ev'],
    async handler(bot, ctx) {
        try {
            console.log("E V A L")
            let evaled = await eval(ctx.message.text.slice(3))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await ctx.reply(evaled)
        } catch (e) {
            ctx.reply(String(e))
        }
    }
}
