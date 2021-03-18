const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => { 
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})
passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId : profile.id})
    
        if(existingUser) {
            //if there's an existing user with same googleId in the DB
            return done(null, existingUser);
        }
        
        //If no user was found
        const user = await new User({googleId : profile.id,
                                        name : profile.displayName}).save()    
        done(null, user);      
    } 
));