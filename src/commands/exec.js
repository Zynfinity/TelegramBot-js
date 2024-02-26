import { exec } from 'child_process'
export default {
    name: ['ex'],
    cmd: ['ex', 'exec'],
    category: 'owner',
    owner: true,
    async handler(msg, { text, conn }) {
        try {
            console.log("E X E C")
            exec(text, (err, res) => {
                if (err) return conn.reply(msg, String(err))
                conn.reply(msg, res)
            })
        } catch (e) {
            conn.reply(msg, String(err))
        }
    }
}
