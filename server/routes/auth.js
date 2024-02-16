const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
 async function(accessToken, refreshToken, profile, done) {
    
    const newUser = {
        googleId : profile.id,
        displayName : profile.displayName,
        firstName : profile.name.givenName,
        lastName : profile.name.familyName,
        profileImage : profile.photos[0].value
    }
    try {
        
        let user = await User.findOne({googleId: profile.Id});

        if (user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
          done(null, user);  
        }


    } catch (error) {
        console.log(error);
    }
  }
));

// google login route 

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

// retrieve user data

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard'
})
  );


// route if there is a error

router.get('/login-failure', (req,res)=>{
    res.render('../views/login-fail')
})

// logout and destroy session

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if (err) {
            console.log(err);
            res.send('error logging out');
            
        } else {
            res.redirect('/');
            
        }
    })
});

// persist user information after successful login

passport.serializeUser(function (user,done){
    done(null,user.id)
});

// retrieve user information from session

passport.deserializeUser(async (id, done) => {

    try {
  
      const user = await User.findById(id);
  
      done(null, user);
  
    } catch (err) {
  
      done(err, null);
  
    }
  
  });

module.exports =router;

