export default {
    name: ['admins'],
    cmd: ['admin', 'admins'],
    category: 'owner',
    owner: true,
    async handler(msg, { conn, text }) {
        try {
            const groupAdmins = (await conn.getChatAdministrators(msg.id)).map(s => s.user)
            const isBotAdmin = groupAdmins.find(s => s.id == 6429614386)
            conn.reply(msg.id, `Status Bot : ${isBotAdmin ? 'Admin' : 'Bukan Admin'}`)
        } catch (e) {
            await conn.reply(msg, String(e))
        }
    }
}
