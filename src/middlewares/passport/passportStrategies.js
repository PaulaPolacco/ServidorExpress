import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as JwtStrategy} from "passport-jwt";
import { Strategy as GitHubStrategy} from "passport-github2";
import { usersModel } from "../../DAL/db/models/users.model.js";
import { compareData, hashData } from "../../utils.js";
// LOCAL
passport.use(
    'local', 
    new LocalStrategy(
        {
            usernameField:'email',
        }, 
        async (email, password, done) => {

            const user = await usersModel.findOne({email})
            if (!user){
            return done(null, false)
            }
            const isPassword = await compareData(password, user.password)
            if (!isPassword){
            return done(null, false) 
            }

            done(null, user)        
        }
    )
)

passport.use('signup', new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true,
    },
    async (req, email, password, done) => {
        const userDB = await usersModel.findOne({email})
        if (userDB){
            return done(null, false)
        }
        const hashpass = await hashData(password)
        const userHash = {...req.body,password:hashpass}
        const newUser = await usersModel.create(userHash)
        return done(null, newUser)
    }
))

//GITHUB
passport.use('github', new GitHubStrategy(
    {
        clientID: 'Iv1.9d4f1f08b22c9586',
        clientSecret: '6518a37b9e8d287c23ecf139466246f9068a4bec',
        callbackURL:'http://localhost:8080/api/users/github'
    },
    async (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        const email = profile._json.email
        const userDB = await usersModel.findOne({email})
        if (userDB){
            done(null,false)
        }
        const newUser={
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1],
            email,
            password: ''
        }
        done(null,false)
 
    }
))

passport.serializeUser((user, done)=> {
    try {
        done(null, user.id);        
    } catch (error) {
        done(error)
    }

  });
  
  passport.deserializeUser(async (id, done)=> {
    try {
        const user = await usersModel.findById(id) 
        done(null, user);
    } catch (error) {
        done(error)
    }

  });