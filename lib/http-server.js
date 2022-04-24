const express = require('express')
const fs = require("fs")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;
const util = require('util');
const { toTimer } = require('./tools');
module.exports = (client) => {
    try {
        app.use(express.static('public'))
        app.get("/infobot", async(req, res) => {
            json = {
                status: 'Active',
                runtime: await toTimer(process.uptime())
            }
            pes = util.format(json)
            res.json(json)
        })
        server.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        });
    } catch {}
}
