const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');
const bcryptSalt = 10;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, username, password, done) => {
    req.body
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));

passport.use("local-signup", new LocalStrategy({
  passReqToCallback:true
},
  (req, username, password, done)=>{

    if (username === "" || password === "") {
      done(null, false, { message: "Indicate username and password" })
      return;
    }
  
    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        done(null, false, { message: "The username already exists" })
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save()
      .then( user => {
        done(null, user)
      })
      .catch(err => {
        done(err)
      })
    });
  }
))