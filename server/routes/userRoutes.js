const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys'); 
const User = require('../models/userSchema');


// const User = mongoose.Model('User');

router.post('/signup', async(req,res) => {
    console.log(req.body);

    try{
        const {Name, Phone, Email, Password} = req.body;
        const user = new User({Name, Phone, Email, Password});
        await user.save();
        const token = jwt.sign({UserId:user._id}, jwtkey);
        res.send({token:token});
    }
    catch(err){
        return res.status(422).send(err.message);
    }
})

router.post('/login', async (req, res) => {
    const {Email, Password} = req.body;
    if(!Email || !Password){
        return res.status(422).send({error: "Must provide email or password 2"});
    }
    const user = await User.findOne({Email});
    if(!user){
        return res.status(422).send({error: "No such account exists"});
    }
    try{
        await user.comparePassword(Password)
        const token = jwt.sign({UserId: user._id}, jwtkey);
        res.send({token:token});
    }
    catch(err){
        return res.status(422).send({error: "Must provide email or password 1"});
    }

})

router.post('/user', async (req,res) => {
    // const {authorization} = req.headers;
    // if(!authorization){
    //     res.status(422).send({error:"User not found"});
    // }
    // const token = authorization.replace("Bearer ","");
    const { token } = req.body;
    jwt.verify(token, jwtkey, async (err, payload) => {
        if(err){
            return res.status(402).send({error:"User not found"});
        }
        const {UserId} = payload;
        const user = await User.findById(UserId);
        // const data = user.UserShow;
        // const {showId, status} = data.show[0];
        res.send(user);
    })
})

router.post('/userShows', async (req,res) => {
    const { token } = req.body;
    jwt.verify(token, jwtkey, async (err, payload) => {
        if(err) {
            return res.send("The user not in the database");
        }
        const {UserId} = payload;
        const user = await User.findById(UserId);
        const {show} = user.UserShow;
        res.send(show)
    })
})


module.exports = router;