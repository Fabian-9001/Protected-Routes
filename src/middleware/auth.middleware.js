/*PROTECTED ROUTES DEPENDENCE*/
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtSecret = require('../../config').api.jwtSecret


/*METHOD FOR VALIDATE USER IN DATABASE AND VERIFY CREDENTIALS IN TOKEN*/
const { findUserById } = require('../users/users.controllers')

/*OPTIONS NEEDS FOR THE LIBRARY*/
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(new JwtStrategy(options, async (tokenDecoded, done) => {

    try {
        const user = await findUserById(tokenDecoded.id)
        if (!user) {
            return done(null, false)
        } else {
            return done(null, tokenDecoded)
        }
    } catch (error) {
        return done(error, false)
    }

}))


module.exports = passport