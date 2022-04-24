const telegram = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')
const syntaxerror = require('syntax-error')
const util = require('util')
const config = JSON.parse(fs.readFileSync('./lib/config.json'))
const bot = new telegram(config.token, {polling: true})
global.shp = '◈'
require('./lib/http-server')(bot)
bot.on('message', (msg) => {
  require('./lib/handler').handler(bot, msg)
})
bot.on('callback_query', (query) => {
    bot.answerCallbackQuery({callback_query_id: query.id})
    const action = query.data;
    const msg = query.message;
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };    
    require('./lib/handler').handler(bot, msg, action, msg)
  });
let pluginFolder = path.join(__dirname, 'commands')
let pluginFilter = (filename) => /\.js$/.test(filename)
global.commands = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
        plugins = require(path.join(pluginFolder, filename))
        if(plugins.function) global.functions[filename] = plugins
        else global.commands[filename] = plugins
    } catch (e) {
        console.log(e)
    }
}
global.reload = (_event, filename) => {
    if (pluginFilter(filename)) {
        let dir = path.join(pluginFolder, filename)
        isi = require(path.join(pluginFolder, filename))
        if (dir in require.cache) {
            delete require.cache[dir]
            if (fs.existsSync(dir)) console.info(`re - require plugin '${filename}'`)
            else {
                console.log(`deleted plugin '${filename}'`)
                delete global.commands[filename]
            }
        } else console.info(`requiring new plugin '${filename}'`)
        let err = syntaxerror(fs.readFileSync(dir), filename)
        if (err) console.log(`syntax error while loading '${filename}'\n${err}`)
        else
            try {
                global.commands[filename] = require(dir)
            } catch (e) {
                console.log(e)
            } finally {
                global.commands = Object.fromEntries(Object.entries(global.commands).sort(([a], [b]) => a.localeCompare(b)))
            }
    }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'commands'), global.reload)
