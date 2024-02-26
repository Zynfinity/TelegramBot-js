import Express from "express";
import { addBot, connectBot, deleteBot } from "../controller/BotController.js";
import { api } from "../config/db.js";

const router = Express.Router();
router.post("/bot/new", async function (req, res) {
    let name = req.body.name;
    let token = req.body.token;
    try {
        let newBot = await addBot(name, token, db, api);
        res.status(newBot.status).json({ ...newBot });
    } catch (e) {
        res.status(401).json({ status: 401, message: e });
    }
});
router.get('/bot/list', async function (req, res) {
    const result = await db.query(api.BotData.listBot)
    res.json(result)
})
router.post('/bot/delete', async function (req, res) {
    const name = req.body.name;
    const del = await deleteBot(name, db, api)
    res.status(del.status).json(del)
})
router.post('/bot/connect', async function (req, res) {
    const name = req.body.name;
    const connect = await connectBot(name, db, api)
    res.status(connect.status).json(connect)
})
export default router;