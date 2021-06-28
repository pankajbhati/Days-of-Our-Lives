const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Picture: {
        type: String
    },
    About: {
        type: String
    },
    UserShow: {
        show : [{
            showId : String,
            showName: String,
            status : String,
        }]
    }, 
    Notifications : {
        type: [String]
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('Password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
         if(err){
             return next(err);
         }
         else bcrypt.hash(user.Password, salt, (err, hash) => {
             if(err){
                 return next(err);
             }
             user.Password = hash;
             next();
         })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.Password, (err, isMatch) => {
            if(err){
                return reject(err); 
            }
            if(!isMatch){
                return reject(err);
            }
            resolve(true);
        })
    })
}

const User = module.exports = mongoose.model('User', userSchema);