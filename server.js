const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookies());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(client_id);

    if (!token) {
        return res.json({Error: 'Token não identificado!'});
    }

    (async () => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token, 
                audience: client_id, 
            });
            const payload = ticket.getPayload();
            const nomeUser = payload["name"];

            return res.json({Mensagem: ` Bem vindo, ${nomeUser}`});
        }catch(err) {
            return err;
        }
    })();
});

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: ${port}`);
});