const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const counter = require('./utils/counter');
const schema = require('./models/image-model');
const sanitise = require('./utils/sanitise');
const multer = require('multer');
const FormData = require('form-data')
const fs = require('fs')
const request = require('request')

const IMAGE_COUNTER = 'ImageCounter';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname)
    },
    filename: function (req, file, cb) {
      cb(null, 'file.glb') 
    }
  })

const upload = multer({storage: storage})

const router = express.Router();

router.post('/add', upload.single('model'), async (req, res) => {
    try {
        const options = {
            method: "POST",
            url: "https://console.echoAR.xyz/upload",
            port: 443,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData : {
                'key': 'key',
                'target_type': '2',
                'hologram_type': '2',
                'email': 'email@gmail.com',
                'type': 'upload',
                "file_model" : fs.createReadStream(__dirname + '/file.glb')
            }
        };
        
        request(options, function (err, resp, bod) {
            if(err) 
                throw new Error();

            let url = JSON.parse(bod).additionalData.shortURL;
            res.status(200).json({
                message: "Uploaded",
                url: url
            });
        });

    } catch(error) {
        res.status(500).json({
            message: 'Server Error'
        });
        console.log(error);
        return;
    }
})


module.exports = router;

