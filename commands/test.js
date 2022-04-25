module.exports = {
    name: ['alive'],
    cmd: ['alive'],
    async handler(msg, {conn}) {
        conn.reply(msg, `Halo, im alive`)
    }
}
