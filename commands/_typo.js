module.exports = {
    function: true,
    async handler(msg, {conn}) {
        pe = await Object.values(global.commands).filter(plugin => !plugin.function && !plugin.disabled)
        cmd = []
        pe.map(cemde => {
            cemde.cmd.map(ps => {
                cmd.push(ps)
            })
        })
        typo = await rzky.tools.detectTypo(msg.command, cmd)
        if(typo.result != ''){
            if(typo.result[0].keakuratan >= '0.70'){
                conn.reply(msg, `Mungkin yang anda maksud adalah : /${typo.result[0].teks}\n\nKeakuratan : ${typo.result[0].keakuratan}\n\nSilahkan ulang jika benar`)
            }
        }
    }
}
