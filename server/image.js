const express = require('express');
const counter = require('./utils/counter');
const schema = require('./models/image-model');
const sanitise = require('./utils/sanitise');
const multer = require('multer');
const fs = require('fs');

const IMAGE_COUNTER = 'ImageCounter';

const SERVER_ERR = 'Server Error';

var storage = multer.memoryStorage();
const upload = multer({storage: storage})

const router = express.Router();

router.get('/get/:id', async (req, res) => {
    res.status(500).json({
        message: SERVER_ERR
    });
    return;
    try {
        var uid = req.params.id.toString();

        let idInInteger = parseInt(uid);

        let image = await schema.findById(idInInteger);

        fs.writeFileSync(
            __dirname + 'out.png',
            image.data,
            'base64')

        res.sendFile(__dirname + 'out.png')

    }  catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
})

router.post('/add', upload.single('image'), async (req, res) => {
    res.status(500).json({
        message: SERVER_ERR
    });
    return;
    try {
        let string = req.body.image;

        counter.count(IMAGE_COUNTER).then(counter => {
            const img = new schema({
                _id: counter,
                data: string
            });

            img.save().then(result => {
                res.status(200).json({
                    message: 'Image URL Saved',
                    id: counter
                });
            })
        });
    } catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
})


module.exports = router;