const express = require('express');
const axios = require('axios');
const app = express();

const FiveM = require("fivem-server-api")

app.set("view engine", "ejs");
app.set("json spaces", 1);
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).render('index');
});

app.post("/", async (req, res) => {
    let { url } = req.body;
    let response;

    let request = `https://cfx.re/join/${url.replace('https://', '').replace('cfx.re/join/', '')}`
    try {
        response = (await axios.get(request)).headers["x-citizenfx-url"].replace("https://", "").replace("http://", "").replace("/", "");
    } catch (error) {
        console.log(error)
    }

    res.status(200).render('index', {
        response
    });
});

app.get("/info/:server", async (req, res) => {
    let { server } = req.params
    let ip = server.split(':')[0]
    let port = server.split(':')[1]

    const fivem = new FiveM.Server(ip, port, 'ERROR')
    const [serverStatus, serverDetail] = await Promise.all([fivem.getServerStatus(), fivem.getServer()])

    res.status(200).render('info', {
        serverStatus,
        serverDetail
    });;
    
    // res.json(serverDetail)
});

const port = 3000;
const listener = app.listen(port, async () => {
    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━${("━").repeat(String(port).length)}┓`);
    console.log(`┃ Online | Server Running | ${listener.address().port} ┃`);
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━${("━").repeat(String(port).length)}┛`);
});