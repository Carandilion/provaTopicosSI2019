const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

var nomes = [];
var albums = [];


const urlApi = 'https://jsonplaceholder.typicode.com/users';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums?userId='
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos?albumId='

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {

    axios.default.get(urlApi)
        .then((data) => {
            for (var i in data.data) {
                nomes.push(data.data[i].name);
            }
            resp.render('index.ejs', { pessoas: data.data })
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
app.get('/:id/albums/', (req, resp) => {
    const id = req.params.id;
    axios.default.get(urlAlbums + '' + id + '')
        .then((data) => {
            for (var i in data.data) {
                albums.push(data.data[i].title);
            }
            resp.render('albums.ejs', { albums: data.data, nomes: nomes, id: id })
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
app.get('/:id/albums/:photosId', (req, resp) => {
    const id = req.params.id;
    const photosId = req.params.photosId;
    axios.default.get(urlPhotos + '' + id + '')
        .then((data) => {
            resp.render('photos.ejs', { photos: data.data, nomes: nomes, albums: albums, id: id, photosId:photosId})
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
    .listen(port);