const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const counter = require('./utils/counter');
const schema = require('./models/user-model');
const sanitise = require('./utils/sanitise');

const USER_COUNTER = 'UserCounter';

const router = express.Router();

const SERVER_ERR = 'Server Error';

const TOKEN = 'YRHACKS2020HPNREP6kEy3123AS0m10jd12311ap1p';

router.get('/get/:id', async (req, res) => {
    try {
        var uid = req.params.id.toString();

        let idInInteger = parseInt(uid);

        let user = await schema.findById(idInInteger);

        res.status(200).json({
            id: user._id,
            username: user.username,
            contactInfo: user.contactInfo,
            joinDate: user.joinDate
        });
    }  catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
})

router.post('/login', async (req, res) => {
    try {
        if(!req) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!req.body) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!(req.body.password && req.body.username)) {
            res.status(401).json({message: 'Invaalid'});
            return;
        }

        let pass = req.body.password.toString();
        let name = req.body.username.toString();

        name = sanitise(name);

        const INVALID = 'Login Invalid.'
        await schema.findOne({username: name}, (err, user) => {
            if(err) {
                res.status(500).json({
                    message: SERVER_ERR
                });
                return
            }

            if(!user) {
                res.status(401).json({
                    message: INVALID
                });
                return
            }

            bcrypt.compare(pass, user.password, (error, response) => {
                if(error) {
                    res.status(500).json({
                        message: SERVER_ERR
                    });
                    return;
                }

                if(response) {
                    const token = jwt.sign({
                        uid: user._id
                    }, TOKEN, {
                        expiresIn: "7d"
                    });

                    res.status(200).json({message: 'Logged in', token: token});
                    return;
                } else {
                    res.status(401).json({
                        message: INVALID
                    });
                }
            });

        })

    } catch(error) {
        res.status(500).json({
            message: SERVER_ERR
        });
        console.log(error);
        return;
    }
})


router.post('/add', async (req, res) => {
    try {
        if(!req) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!req.body) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        if(!(req.body.password && req.body.username && req.body.contactInfo)) {
            res.status(401).json({message: 'Invalid'});
            return;
        }

        let pass = req.body.password.toString();
        let name = req.body.username.toString();
        let cont = req.body.contactInfo.toString();

        name = sanitise(name);

        cont = sanitise(cont);

        await schema.findOne({username: name}, async (err, found) => {
            if(err) {
                res.status(500).json({
                    message: SERVER_ERR
                });
            }
            if(found) {
                res.status(401).json({
                    message: "User already exists"
                });
            }

            await bcrypt.hash(pass, 6, (err, hash) => {
                if(err) {
                    res.status(500).json({message: SERVER_ERR});
                    return;
                }

                counter.count(USER_COUNTER).then(counter => {
                    if(!counter) {
                        res.status(500).json({message: SERVER_ERR});
                        return;
                    }

                    const user = new schema({
                        _id: counter,
                        username: name,
                        password: hash,
                        contactInfo: cont
                    });

                    user.save().then(result => {
                        res.status(200).json( {
                            message: 'User registered. You may sign in.'
                        })
                    }).catch(err => {
                        console.log(error);
                        res.status(500).json({message: SERVER_ERR});
                        return;
                    })
                })
            });
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