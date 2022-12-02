const express = require('express');
const app = express();
const port = process.env.port || 3000;
var cookies = require("cookie-parser");
var CLIENT_ID = '';

function getCookie(name, req) {
    var cookie = {};
    const cookieHeader = req.cookies;

    cookieHeader.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    
    return cookie[name];
  }

app.set('view engine', 'ejs');
app.use(cookies());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', function (req, res) {
    const token = req.cookies['g_csrf_token'];
    CLIENT_ID = req.cookies['connect.sid'];
    console.log('Token:', token, 'Cliente ID:', CLIENT_ID);

    if (!token) {
        console.log('Nenhum token identificado');
    }else {
        console.log('Prossigamos guerreiros!');
    }

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(CLIENT_ID);
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