const express = require('express');
const axios = require('axios');
const app = express();

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
        response = `Success - ${( await axios.get(request) ).headers["x-citizenfx-url"].replace("http://", "").replace("/", "")}`;
    } catch (error) {
        response = "Invalid or server might be offline!"
    }
    
    res.status(200).render('index', {
        response
    });
});

const port = 3000;
const listener = app.listen(port, async () => {
    console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━${("━").repeat(String(port).length)}┓`);
    console.log(`┃ Online | Server Running | ${listener.address().port} ┃`);
    console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━${("━").repeat(String(port).length)}┛`);
});