const passport = require('passport');
const local = require('passport-local');
const GithubStrategy = require('passport-github2')
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');
const { cartsService } = require('../repositories');

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { firstName, lastName, email, age } = req.body;

        let user = await UserModel.findOne({email: username})

        try {

            if(user) {
                return done(null, false)
            }

            const cart = await cartsService.create();

            const newUser = { 
                firstName, 
                lastName, 
                email, 
                age, 
                password: createHash(password),
                cart: cart._id 
            }

            const result = await UserModel.create(newUser)

            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'

    }, async (email, password, done) => {

        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                return done(null, false);
            }
    
            if(!isValidPassword(user, password)) {
                return done(null, false);
            }
    
            return done(null, user)

        } catch (error) {
            return done(error);
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.0a6208173c9f8311',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        clientSecret: '304f856876329e4aae38c4d650146993731290bf'
        
    }, async (_accessToken, _refreshToken, profile, done) => {
        try {

            const user = await UserModel.findOne({email: profile._json.email})

            if(!user) {
                let newUser = {
                    firstName: profile._json.name,
                    lastName: '',
                    age: 0,
                    email: profile._json.email
                }

                let result = await UserModel.create(newUser);

                return done(null, result)
            } else {
                return done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))
}

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
})

module.exports = initializePassport;