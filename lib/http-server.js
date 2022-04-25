const express = require('express')
const fs = require("fs")
const os = require('os')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;
const util = require('util');
const { toTimer } = require('./tools');
module.exports = (client) => {
    try {
        app.use(express.static('public'))
        app.get(["/infobot", "/"], async(req, res) => {
            serverin = {}
            for(let i of Object.keys(require('os'))){
                if(i != 'setPriority' && typeof os[i] == 'function')
                    serverin[i] = await os[i]()
            }
            json = {
                status: 'Active',
                runtime: await toTimer(process.uptime()),
                infoserver: serverin
            }
            pes = util.format(json)
            res.json(json)
        })
        server.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        });
    } catch {}
}
