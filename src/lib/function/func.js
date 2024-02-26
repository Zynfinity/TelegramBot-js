import util from "util"
async function func(conn, msg) {
    msg.id = msg.chat.id
    msg.username = msg.chat.type == "group" ? msg.from.is_bot ? msg.reply_to_message.from.username : msg.from.username : msg.chat.username
    msg.isUrl = (url) => {
        return url.match(
            new RegExp(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
                "gi"
            )
        );
    }
    conn.sendText = async (from, text, optn) => {
        if (typeof text !== 'string') text = util.inspect(text)
        const send = await conn.sendMessage(from, text, { ...optn })
        return send
    }
    conn.reply = async (m, text, optn) => {
        if (typeof text !== 'string') text = util.inspect(text)
        const send = await conn.sendMessage(msg.id, text, { reply_to_message_id: msg.message_id, ...optn })
        return send
    }
}
export default func