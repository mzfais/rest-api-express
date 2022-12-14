const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hallo', (req, res) => {
    res.json({
        message: 'Hallo express JS'
    })
});

const mhsRouter = require('./src/routes/mahasiswa-route');
app.use('/', mhsRouter);
app.listen(8181, () => {
    console.log('server running on port 8181')
})
