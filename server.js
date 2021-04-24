const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const counter = require('./server/models/counter-model');
//const multer = require('multer');
//var upload = multer();

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

const URI = 'mongodb+srv://hpn:soyuznerushimy@cluster0.qatum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

async function initDB(name) {
    await counter.exists({
        _id: name
    }, (err, result) => {
        if(err) {
            console.log('Error');
            console.log(err);
            return;
        }
        if(result) {
            console.log(name + ' increment counter already exists, continuing...');
            return;
        }
        // else, create increment counter
        const userIncrement = new counter ({
            _id: name
        });
        userIncrement.save().then(result => {
            console.log(name + ' increment counter created');
        }).catch(error => {
            console.log('Error creating ' + name + ' increment counter: ');
            console.log(error);
        });
    });
};

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('DB Connected');
    initDB('UserCounter');
    initDB('ImageCounter');
    initDB('ProductCounter');
}).catch((err) => {
    console.log(err);
});


app.use(bodyParser.json());
//app.use(upload.array())

app.listen(port, () => {
    console.log('Server listening at port ' + port + '...');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public/product'));

app.get('/show/:id', (req, res) => {
    if(req.params.id == 'product.css') {
        res.sendFile(__dirname + '/public/product/product.css');
        return;
    } else if (req.params.id == 'product.js') {
        res.sendFile(__dirname + '/public/product/product.js');
        return;
    }
    res.sendFile(__dirname + '/public/product/product.html');
});

app.get('/upload/:id', (req, res) => {
    if(req.params.id == 'upload.css') {
        res.sendFile(__dirname + '/public/upload/upload.css');
        return;
    } else if (req.params.id == 'product.js') {
        res.sendFile(__dirname + '/public/upload/upload.js');
        return;
    }
    res.sendFile(__dirname + '/public/upload/upload.html');
});
app.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/public/upload/upload.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login/login.html');
})

app.get('/login/:id', (req, res) => {
    if(req.params.id == 'login.css') {
        res.sendFile(__dirname + '/public/login/login.css');
        return;
    } else if (req.params.id == 'login.js') {
        res.sendFile(__dirname + '/public/login/login.js');
        return;
    }
});

const userRoute = require('./server/user');
app.use('/user', userRoute);

const productRoute = require('./server/product');
app.use('/product', productRoute);

const imageRoute = require('./server/image');
app.use('/image', imageRoute);

const modelRoute = require('./server/model');
app.use('/model', modelRoute);
