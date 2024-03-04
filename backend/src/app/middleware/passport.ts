import passport from 'passport'
import passportJwt from 'passport-jwt'
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const invalidTokenMessage = 'the token is not valid or expired'

// passport.use();
