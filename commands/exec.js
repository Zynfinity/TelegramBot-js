const {exec} = require('child_process')
module.exports = {
    name: ['ex'],
    async handler(bot, ctx) {
        try {
            console.log("E X E C")
            exec(ctx.message.text.slice(3), (err, res){
                if(err) return ctx.reply(String(err))
                ctx.reply(res)
            })
        } catch (e) {
            ctx.reply(String(e))
        }
    }
}
