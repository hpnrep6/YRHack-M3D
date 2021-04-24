const express = require('express');
const sanitise = require('./utils/sanitise');
const schema = require('./models/product-model');
const counter = require('./utils/counter');
const verify = require('./utils/verify');
const multer = require('multer');

var storage = multer.memoryStorage();
const upload = multer({storage: storage})

const router = express.Router();

//router.use(upload.array());

const SERVER_ERR = 'Server Error';

router.get('/get', async (req, res) => {
    try {
        const filter = {};
        const all = await schema.find(filter);

        res.status(200).json(
            all
        )
    } catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
})



router.post('/add', verify, (req, res) => {
    try{ 
        if(!req) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!req.body) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!(req.body.name && req.body.description && req.body.price)) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        let name = sanitise(req.body.name);
        let desc = sanitise(req.body.description);
        let price = parseInt(req.body.price);

        let image ='';
        let model ='';

        if(req.body.image) {
            image = sanitise(req.body.image);
        }

        if(req.body.model) {
            model = sanitise(req.body.model);
        }
        
        counter.count('ProductCounter').then(counter => {
            if(!counter) {
                res.status(500).json({message: SERVER_ERR});
                return;
            }

            const prod = new schema({
                _id: counter,
                user: req.user.username,
                name: name,
                description: desc,
                price: price,
                image: image,
                model: model
            })

            prod.save().then(result => {
                res.redirect('/')
            }).catch(err => {
                console.log(error);
                res.status(500).json({message: SERVER_ERR});
                return;
            })
        })
       
    } catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
    
})

module.exports = router;