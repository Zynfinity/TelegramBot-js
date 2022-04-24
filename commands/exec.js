const {exec} = require('child_process')
module.exports = {
    name: ['ex'],
    cmd: ['ex', 'exec'],
    category: 'owner',
    async handler(msg, {text, conn}) {
        try {
            console.log("E X E C")
            exec(text, (err, res) => {
                if(err) return msg.reply(String(err))
                conn.reply(msg, res)
            })
        } catch (e) {
            conn.reply(msg, String(err))
        }
    }
}
