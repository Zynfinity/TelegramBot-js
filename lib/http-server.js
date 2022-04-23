const express = require('express')
const fs = require("fs")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;
const util = require('util')
module.exports = (client) => {
    try {
        app.use(express.static('public'))
        app.get("/infobot", (req, res) => {
            console.log(client.botInfo)
            ren = JSON.stringify(client, null, 2)
            pes = util.format(ren)
            res.send(pes)
        })
        server.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        });
    } catch {}
}
