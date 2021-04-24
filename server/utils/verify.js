const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schema = require('../models/user-model');

async function verify(req, res, next) {
    try{
        let token = jwt.verify(req.body.token, 'YRHACKS2020HPNREP6kEy3123AS0m10jd12311ap1p');
        let decodedToken = token;

        let id = parseInt(decodedToken.uid);

        await schema.findById(id, async (err, user) => {
            if(err) {
                res.status(500).json({message: 'Error'});
                return;
            }
    
            if(!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }

            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Authorisation failed'
        });
    }
}

module.exports = verify;