const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Organizer: {
        type: String,
        required: true
    },
    Timing: {
        type: Date,
        required: true
    },
    Venue: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Audience: {
        type: Number
    },
    ShowParticipants: {
        Participants : [{
            UserId : String,
            UserName : String,
            Age : Number,
            SampleContent : String
        }]
    },
    ShortDescription : {
        type : String
    },
    LongDescription : {
        type : String
    },
    Rules : {
        type: String
    }
});

const Show = module.exports = mongoose.model('Show',showSchema);