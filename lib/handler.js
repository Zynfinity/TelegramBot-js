module.exports = {
  async handler(bot, ctx){
    cmd = await Object.values(global.commands).find(cdm => cdm.name.includes(ctx.message.text.split(' ')[0].slice(1)))
    if(cmd == undefined) return console.log('Command not found')
    try{
      await cmd.handler(bot, ctx)
    }catch(e){
      ctx.reply(String(e))
    }
  }
}
