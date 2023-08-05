const express = require("express");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const bodyParser = require("body-parser").json()
var router = express.Router();
const { SECRECT_KEY, TOKEN_LIFE } = require("../config/config");  // to get key from config


const { User } = require('../models/task');

//get
router.get('/', async (req, res) => { 
    await User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error' + JSON.stringify(err,undefined,2));}
    });
});
//user/register
router.post("/register", (req,res) =>{
   
    var userData = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        isActive : req.body.isActive
    });
    User.findOne({email : req.body.email}).then(user => {
        if (!user) {
            userData.save((err, docs) => {
                if (!err) { res.send(docs); }
                else { console.log('error' + JSON.stringify(err,undefined,2));}
            });
        }
        else {
            res.json({ message : `user already exists: ${req.body.userName}`});
        }
    })
});

//login user/login
router.post('/login', (req, res) => { 
    
    User.findOne({email : req.body.email}).then(user => { 
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var payload = {
                    _id : user._id,
                    email : user.email,
                    password : user.password,
                    isActive : user.isActive
                };
                //Jwt token
                let token = jwt.sign(payload, SECRECT_KEY, { 
                    algorithm: "HS256", expiresIn: TOKEN_LIFE 
                });
                res.status(200).send({ auth: true, signed_user: user.userName, token: token });
            }
        }
        else {
            res.json({ message : `user not exists: ${req.body.userName}`});
        }
    });    
});

//put
router.put("/:id?", async (req,res) => {
    if (req.params._id) {
        
    }
    var user = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        isActive : req.body.isActive
    });
    await user.save((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error' + JSON.stringify(err,undefined,2));}
    });
});
router.delete("/:id?", (req,res) => {

    if (req.params._id) {
        
    }

});


module.exports = router;