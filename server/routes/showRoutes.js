const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const Show = require('../models/showSchema');
const User = require('../models/userSchema');


router.post('/createshow', async (req,res) => {
    console.log(req.body);

    try{
        const {Name, Organizer, Timing, Venue, Price, Audience, ShortDescription, LongDescription} = req.body;
        const show = new Show({Name, Organizer, Timing, Venue, Price, Audience, ShortDescription, LongDescription});
        await show.save();
        const token = jwt.sign({showId:show._id}, jwtkey);
        res.send({token:token});
    }
    catch(err) {
        return res.status(422).send(err.message);
    }

});

router.get('/getshows', async (req,res) =>{
    Show.find({}, (err, shows) => {
        if(err){
            return res.status(401).send(err.message);
        }
            res.send({shows:shows});
    });
});

router.post('/getshow', async(req,res) => {
    try{
        const {_id} = req.body;
        const show = await Show.findOne({_id});
        if(!show) {
            res.send("This show has been deleted");
        }
        else {
        res.send({show});
        }
    } catch(err) {
        res.status(432).send("Something went wrong");
    }
})

router.post('/performer', async (req, res) => {
    const {token, _id, Name, Age, SampleContent} = req.body;
    jwt.verify(token, jwtkey, async (err, payload) => {
        if(err) {
           return res.status(409).send("Something went wrong in token")
        }
        const { UserId } = payload;
        const user = await User.findById(UserId)
        const show = await Show.findById(_id);
        Show.findByIdAndUpdate(_id, 
            {$push: {"ShowParticipants.Participants": {
                      "UserId" : UserId,
                      "UserName" : Name,
                      "Age" : Age,
                      "SampleContent" : SampleContent
                   }
            }},
            { safe: true, upsert: true},
               function(err) {
                   if(err) {
                       return res.send("err");
                   }
                //    else {
                //         res.send("User Id add ho gya hai");
                //    }
               });
        User.findByIdAndUpdate(UserId,
            {$push: { "UserShow.show" : {
                    "showId" : _id,
                    "showName" : show.Name,
                    "status" : "Participant"
                }
            }},
            {safe: true, upsert: true},
            function(err) {
                if(err) {
                    return res.send("err");
                }
                else {
                    res.send("Show Id bhi add ho gya hai");
                }
            });
    })
})

router.post('/audience', async (req, res) => {
    const {token, _id} = req.body;
    jwt.verify(token, jwtkey, async (err, payload) => {
        if(err) {
            return res.send("You must be logged in! ");
        }
        const show = await Show.findById(_id);
        const { UserId } = payload;
        User.findByIdAndUpdate(UserId,
            {$push: { "UserShow.show" : {
                "showId" : _id,
                "showName" : show.Name,
                "status" : "Audience"
            }
        }},
        {safe: true, upsert: true},
        function(err){
            if(err) {
                return res.send("err");
            }
            else {
                res.send("Proceed to the payment Gateway");
            }
        });
    })
})

module.exports = router;