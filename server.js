const express = require('express');
const app = express();
const port = process.env.port || 3000;
const CLIENT_ID = '';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
var cookies = require("cookie-parser");

app.set('view engine', 'ejs');
app.use(cookies());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { token }= req.cookies('credential');

    if (!token) {
        console.log('Nenhum token identificado');
    }else {
        console.log('Prossigamos guerreiros!');
    }

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify().catch(console.error);
});

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: ${port}`);
});