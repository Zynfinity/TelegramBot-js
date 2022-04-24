async function func(conn, msg){
    msg.id = msg.chat.id
    msg.isUrl = (url) => {
        return url.match(
            new RegExp(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
                "gi"
            )
        );
    }
    conn.sendText = async(from, text, optn) => {
        if (typeof text !== 'string') text = require('util').inspect(text)
        const send = await conn.sendMessage(from, text, {...optn})
        return send
    }
    conn.reply = async(m, text, optn) => {
        if (typeof text !== 'string') text = require('util').inspect(text)
        const send = await conn.sendMessage(m.id, text, {reply_to_message_id: m.message_id, ...optn})
        return send
    }
}
module.exports = func