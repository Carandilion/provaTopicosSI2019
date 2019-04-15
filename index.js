const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const urlApi = 'https://jsonplaceholder.typicode.com/users';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums?userId='

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {
    axios.default.get(urlApi)
        .then((data) => {
            resp.render('index.ejs', { pessoas: data.data })
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
app.get('/:id', (req, resp) => {
    const id = req.params.id;
    axios.default.get(urlAlbums+''+id+'')
        .then((data) => {
            resp.render('albums.ejs', { albums: data.data, identity:id})
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
.listen(port);