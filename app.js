const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/classifier', (req, res) => {
    res.render('classifier');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000, () => {
    console.log('Server is running!');
})