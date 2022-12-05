const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(cookies());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({Mensagem: 'Caminho raiz, siga para /login'});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', function (req, res) {
    const token = req.body.credential;
    const audience = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(audience);

    if (!token) {
        return;
    }else {
        token.split('.')
    }
    
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token, 
            audience: audience, 
        });
        const payload = ticket.getPayload();
        const email = payload["email"];
        console.log(email);
    }
    verify()
    .then(res.json({Mensagem: 'Login bem sucedido!'}))
    .catch(console.error);
});

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: ${port}`);
});